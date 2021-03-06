/**
 * @module node-opcua-client-private
 */
// tslint:disable:no-empty
import { EventEmitter } from "events";
import * as _ from "underscore";

import { assert } from "node-opcua-assert";
import { DataValue, TimestampsToReturn } from "node-opcua-data-value";
import { checkDebugFlag, make_debugLog } from "node-opcua-debug";
import { MonitoringMode, MonitoringParametersOptions } from "node-opcua-service-subscription";
import { StatusCode } from "node-opcua-status-code";

import { resolveNodeId } from "node-opcua-nodeid";
import { ReadValueIdOptions } from "node-opcua-types";
import { ClientMonitoredItemBase, ClientMonitoredItemOrGroupAction } from "../client_monitored_item_base";
import { ClientMonitoredItemGroup } from "../client_monitored_item_group";
import { ClientMonitoredItemToolbox } from "../client_monitored_item_toolbox";
import { ClientSubscription } from "../client_subscription";
import { Callback, ErrorCallback } from "../common";
import { ClientMonitoredItemBaseImpl } from "./client_monitored_item_base_impl";
import { ClientSubscriptionImpl } from "./client_subscription_impl";

const debugLog = make_debugLog(__filename);
const doDebug = checkDebugFlag(__filename);
const warningLog = debugLog;

/**
 * ClientMonitoredItemGroup
 * event:
 *    "initialized"
 *    "err"
 *    "changed"
 *
 *  note: this.monitoringMode = subscription_service.MonitoringMode.Reporting;
 */
export class ClientMonitoredItemGroupImpl extends EventEmitter implements ClientMonitoredItemGroup  {

    private readonly subscription: ClientSubscription;
    private readonly monitoredItems: ClientMonitoredItemBase[];
    private timestampsToReturn: TimestampsToReturn;
    private readonly monitoringMode: MonitoringMode;

      constructor(
        subscription: ClientSubscription,
        itemsToMonitor: any[],
        monitoringParameters: any,
        timestampsToReturn: TimestampsToReturn
    ) {

        super();
        assert(_.isArray(itemsToMonitor));
        // Try to resolve the nodeId and fail fast if we can't.
        itemsToMonitor.forEach((itemToMonitor: ReadValueIdOptions) => {
              itemToMonitor.nodeId = resolveNodeId(itemToMonitor.nodeId!);
        });

        timestampsToReturn = timestampsToReturn || TimestampsToReturn.Neither;

        assert(subscription.constructor.name === "ClientSubscriptionImpl");

        this.subscription = subscription;

        this.monitoredItems = itemsToMonitor.map((itemToMonitor) => {
            return new ClientMonitoredItemBaseImpl(subscription, itemToMonitor, monitoringParameters);
        });

        this.timestampsToReturn = timestampsToReturn;
        this.monitoringMode = MonitoringMode.Reporting;
    }

    public toString(): string {

        let ret = "ClientMonitoredItemGroup : \n";
        ret += "itemsToMonitor:       = [\n " +
            this.monitoredItems.map((monitoredItem: ClientMonitoredItemBase) =>
                monitoredItem.itemToMonitor.toString()).join("\n")
         + "\n];\n";
        ret += "timestampsToReturn:   " +
            this.timestampsToReturn.toString() + "\n";
        ret += "monitoringMode        " + MonitoringMode[this.monitoringMode];
        return ret;
    }

    /**
     * @method terminate
     * remove the MonitoredItem from its subscription
     * @async
     */
    public async terminate(): Promise<void>;
    public terminate(done: ErrorCallback): void;
    public terminate(...args: any[]): any {
        const done = args[0] as  ErrorCallback;
        assert(!done || _.isFunction(done));
        /**
         * Notify the observer that this monitored item has been terminated.
         * @event terminated
         */
        this.emit("terminated");
        const subscription = this.subscription as ClientSubscriptionImpl;
        subscription._delete_monitored_items(this.monitoredItems, (err?: Error) => {
            if (done) {
                done(err);
            }
        });
    }

    // tslint:disable:unified-signatures
    /**
     * @method modify
     */
    public async modify(
        parameters: MonitoringParametersOptions
    ): Promise<StatusCode>;
    public async modify(
        parameters: MonitoringParametersOptions,
        timestampsToReturn: TimestampsToReturn
    ): Promise<StatusCode>;
    public modify(
        parameters: MonitoringParametersOptions,
        callback: (err: Error|null, statusCode?: StatusCode) => void): void;
    public modify(
        parameters: MonitoringParametersOptions,
        timestampsToReturn: TimestampsToReturn | null,
        callback: (err: Error | null, statusCode?: StatusCode) => void): void;
    public modify(...args: any[]): any {
        if (args.length === 2) {
            return this.modify(args[0], null, args[1]);
        }
        const parameters = args[0] as MonitoringParametersOptions;
        const timestampsToReturn = args[1] as TimestampsToReturn;
        const callback = args[2] as ErrorCallback;
        this.timestampsToReturn = timestampsToReturn || this.timestampsToReturn;
        ClientMonitoredItemToolbox._toolbox_modify(
            this.subscription,
            this.monitoredItems,
            parameters,
            this.timestampsToReturn,
            (err: Error | null) => {
                callback(err ? err : undefined);
            });
    }

    public async setMonitoringMode(
        monitoringMode: MonitoringMode
    ): Promise<StatusCode>;
    public setMonitoringMode(
        monitoringMode: MonitoringMode,
        callback: Callback<StatusCode>
        ): void;
    public setMonitoringMode(...args: any[]): any {
        const monitoringMode = args[0] as MonitoringMode;
        const callback = args[1] as Callback<StatusCode>;
        ClientMonitoredItemToolbox._toolbox_setMonitoringMode(
            this.subscription,
            this.monitoredItems,
            monitoringMode, (err: Error | null, statusCode?: StatusCode[]) => {
                // todo fix me
                callback(err, statusCode![0]);
            });
    }

    /**
     * @internal
     * @method _monitor
     * Creates the monitor item (monitoring mode = Reporting)
     * @private
     */
    public _monitor(done: ErrorCallback) {
        assert(done === undefined || _.isFunction(done));

        this.monitoredItems.forEach((monitoredItem: ClientMonitoredItemBase, index: number) => {

            monitoredItem.on("changed", (dataValue: DataValue) => {
                /**
                 * Notify the observers that a group MonitoredItem value has changed on the server side.
                 * @event changed
                 * @param monitoredItem
                 * @param value
                 * @param index
                 */
                try {
                    this.emit("changed", monitoredItem, dataValue, index);
                } catch (err) {
                    warningLog(err);
                }
            });
        });

        ClientMonitoredItemToolbox._toolbox_monitor(
            this.subscription,
            this.timestampsToReturn,
            this.monitoredItems,
            (err?: Error) => {
                if (err) {
                    this.emit("terminated");
                } else {
                    this.emit("initialized");
                    // set the event handler
                }

                if (done) {
                    done(err);
                }
            });
    }
}

// tslint:disable:no-var-requires
// tslint:disable:max-line-length
const thenify = require("thenify");
const opts = {multiArgs: false};

ClientMonitoredItemGroupImpl.prototype.terminate = thenify.withCallback(ClientMonitoredItemGroupImpl.prototype.terminate);
ClientMonitoredItemGroupImpl.prototype.setMonitoringMode = thenify.withCallback(ClientMonitoredItemGroupImpl.prototype.setMonitoringMode);
ClientMonitoredItemGroupImpl.prototype.modify = thenify.withCallback(ClientMonitoredItemGroupImpl.prototype.modify);

ClientMonitoredItemGroup.create = (
    subscription: ClientSubscription,
    itemsToMonitor: any[],
    monitoringParameters: any,
    timestampsToReturn: TimestampsToReturn
) => {
    const monitoredItemGroup = new ClientMonitoredItemGroupImpl(
        subscription,
        itemsToMonitor,
        monitoringParameters,
        timestampsToReturn
    );

    (subscription as ClientSubscriptionImpl)._wait_for_subscription_to_be_ready((err?: Error) => {
        if (err) {
            return ;
        }
        monitoredItemGroup._monitor((err1?: Error) => {
        });
    });
    return monitoredItemGroup;
};
