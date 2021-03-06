// tslint:disable:max-line-length
// import * as utils  from "node-opcua-utils";
//
// /**
//  * @module node-opcua-address-space.AlarmsAndConditions
//  */
// exports.install = function (AddressSpace) {
//
//
//     const UAConditionBase = require("./condition").UAConditionBase;
//     const UAAcknowledgeableConditionBase = require("./acknowledgeable_condition").UAAcknowledgeableConditionBase;
//
//     // /**
//     //  * @class AddressSpace
//     //  * @method instantiateCondition
//     //  * @param  conditionTypeId
//     //  * @param options
//     //  * @param data
//     //  * @return {UAConditionBase}
//     //  */
//     // AddressSpace.prototype.instantiateCondition = function (conditionTypeId, options, data) {
//     //     return this._resolveRequestedNamespace(options).instantiateCondition(conditionTypeId, options, data);
//     // };
//     // utils.setDeprecated(AddressSpace,"instantiateCondition","use Namespace#instantiateCondition instead");
//     //
//     // Namespace.prototype.instantiateCondition = function (conditionTypeId, options, data) {
//     //     const namespace = this;
//     //     return UAConditionBase.instantiate(namespace, conditionTypeId, options, data);
//     // };
// /*    /!**
//      * @class AddressSpace
//      * @method instantiateAcknowledgeableCondition
//      * @param  conditionTypeId
//      * @param  options
//      * @param  data
//      * @return {UAAcknowledgeableConditionBase}
//      *!/
//     AddressSpace.prototype.instantiateAcknowledgeableCondition = function (conditionTypeId, options, data) {
//         return this._resolveRequestedNamespace(options).instantiateCondition(conditionTypeId, options, data);
//     };
//     utils.setDeprecated(AddressSpace,"instantiateAcknowledgeableCondition","use Namespace#instantiateAcknowledgeableCondition instead");
//     Namespace.prototype.instantiateAcknowledgeableCondition = function (conditionTypeId, options, data) {
//         const namespace = this;
//         return UAAcknowledgeableConditionBase.instantiate(namespace, conditionTypeId, options, data);
//     };
//     import { UAAlarmConditionBase } from "./alarm_condition);
//     /!**
//      * @class AddressSpace
//      * @method instantiateAlarmCondition
//      * @param  alarmConditionTypeId
//      * @param  options
//      * @param  data
//      * @return {UAAlarmConditionBase}
//      *!/
//     AddressSpace.prototype.instantiateAlarmCondition = function (alarmConditionTypeId, options, data) {
//         return this._resolveRequestedNamespace(options).instantiateAlarmCondition(alarmConditionTypeId, options, data);
//     };
//     utils.setDeprecated(AddressSpace,"instantiateAlarmCondition","use Namespace#instantiateAlarmCondition instead");
//     Namespace.prototype.instantiateAlarmCondition = function (alarmConditionTypeId, options, data) {
//         const namespace = this;
//         return UAAlarmConditionBase.instantiate(namespace, alarmConditionTypeId, options, data);
//     };
//
//     import { UALimitAlarm } from "./limit_alarm";
//     /!**
//      * @class AddressSpace
//      * @method instantiateLimitAlarm
//      * @param  limitAlarmTypeId
//      * @param  options
//      * @param  data
//      * @return {UALimitAlarm}
//      *!/
//     AddressSpace.prototype.instantiateLimitAlarm = function (limitAlarmTypeId, options, data) {
//         return this._resolveRequestedNamespace(options).instantiateLimitAlarm(limitAlarmTypeId, options, data);
//     };
//     utils.setDeprecated(AddressSpace,"instantiateLimitAlarm","use Namespace#instantiateLimitAlarm instead");
//     Namespace.prototype.instantiateLimitAlarm = function (limitAlarmTypeId, options, data) {
//         const namespace = this;
//         return UALimitAlarm.instantiate(namespace, limitAlarmTypeId, options, data);
//     };
//     import { UAExclusiveLimitAlarm } from "./exclusive_limit_alarm";
//     /!**
//      * @class AddressSpace
//      * @method instantiateExclusiveLimitAlarm
//      * @param  exclusiveLimitAlarmTypeId
//      * @param  options
//      * @param  data
//      * @return {UAExclusiveLimitAlarm}
//      *!/
//     AddressSpace.prototype.instantiateExclusiveLimitAlarm = function (exclusiveLimitAlarmTypeId, options, data) {
//         return this._resolveRequestedNamespace(options).instantiateExclusiveLimitAlarm(exclusiveLimitAlarmTypeId, options, data);
//     };
//     utils.setDeprecated(AddressSpace,"instantiateExclusiveLimitAlarm","use Namespace#instantiateExclusiveLimitAlarm instead");
//     Namespace.prototype.instantiateExclusiveLimitAlarm = function (exclusiveLimitAlarmTypeId, options, data) {
//         const namespace = this;
//         return UAExclusiveLimitAlarm.instantiate(namespace, exclusiveLimitAlarmTypeId, options, data);
//     };*/
//     // const UAExclusiveDeviationAlarm = require("./exclusive_deviation_alarm").UAExclusiveDeviationAlarm;
//     // /**
//     //  * @class AddressSpace
//     //  * @method instantiateExclusiveDeviationAlarm
//     //  * @param  options
//     //  * @param  data
//     //  * @return {UAExclusiveDeviationAlarm}
//     //  */
//     // AddressSpace.prototype.instantiateExclusiveDeviationAlarm = function (options, data) {
//     //     return this._resolveRequestedNamespace(options).instantiateExclusiveDeviationAlarm(options, data);
//     // };
//     // utils.setDeprecated(AddressSpace,"instantiateExclusiveDeviationAlarm","use Namespace#instantiateExclusiveDeviationAlarm instead");
//     // Namespace.prototype.instantiateExclusiveDeviationAlarm = function (options, data) {
//     //     const namespace = this;
//     //     return UAExclusiveDeviationAlarm.instantiate(namespace, "ExclusiveDeviationAlarmType", options, data);
//     // };
//     // import { UANonExclusiveLimitAlarm } from "./non_exclusive_limit_alarm";
//     // /**
//     //  * @class AddressSpace
//     //  * @method instantiateNonExclusiveLimitAlarm
//     //  * @param  nonExclusiveLimitAlarmTypeId
//     //  * @param  options
//     //  * @param  data
//     //  * @return {UANonExclusiveLimitAlarm}
//     //  */
//     // AddressSpace.prototype.instantiateNonExclusiveLimitAlarm = function (nonExclusiveLimitAlarmTypeId, options, data) {
//     //     return this._resolveRequestedNamespace(options).instantiateNonExclusiveLimitAlarm(nonExclusiveLimitAlarmTypeId, options, data);
//     // };
//     // utils.setDeprecated(AddressSpace,"instantiateNonExclusiveLimitAlarm","use Namespace#instantiateNonExclusiveLimitAlarm instead");
//     // Namespace.prototype.instantiateNonExclusiveLimitAlarm = function (nonExclusiveLimitAlarmTypeId, options, data) {
//     //     const namespace = this;
//     //     return UANonExclusiveLimitAlarm.instantiate(namespace, nonExclusiveLimitAlarmTypeId, options, data);
//     // };
//     //
//     // const UANonExclusiveDeviationAlarm = require("./non_exclusive_deviation_alarm").UANonExclusiveDeviationAlarm;
//     // /**
//     //  * @class AddressSpace
//     //  * @method instantiateNonExclusiveDeviationAlarm
//     //  * @param  options
//     //  * @param  data
//     //  * @return {UANonExclusiveDeviationAlarm}
//     //  */
//     // AddressSpace.prototype.instantiateNonExclusiveDeviationAlarm = function (options, data) {
//     //     return this._resolveRequestedNamespace(options).instantiateNonExclusiveDeviationAlarm(options, data);
//     // };
//     //
//     // utils.setDeprecated(AddressSpace,"instantiateNonExclusiveDeviationAlarm",
//     // "use Namespace#instantiateNonExclusiveDeviationAlarm instead");
//     // Namespace.prototype.instantiateNonExclusiveDeviationAlarm = function (options, data) {
//     //     const namespace = this;
//     //     return UANonExclusiveDeviationAlarm.instantiate(namespace, "NonExclusiveDeviationAlarmType", options, data);
//     // };
//
// // // --------------------------------- Discrete Alarms
// //     const UADiscreteAlarm = require("./discrete_alarm").UADiscreteAlarm;
// //     /**
// //      * @class AddressSpace
// //      * @method instantiateOffNormalAlarm
// //      * @param discreteAlarmType
// //      * @param  options
// //      * @param  data
// //      * @return {UAOffNormalAlarm}
// //      */
// //     AddressSpace.prototype.instantiateDiscreteAlarm = function (discreteAlarmType, options, data) {
// //         return this._resolveRequestedNamespace(options).instantiateDiscreteAlarm(discreteAlarmType, options, data);
// //     };
// //     utils.setDeprecated(AddressSpace,"instantiateDiscreteAlarm","use Namespace#instantiateDiscreteAlarm instead");
// //     Namespace.prototype.instantiateDiscreteAlarm = function (discreteAlarmType, options, data) {
// //         const namespace = this;
// //         return UADiscreteAlarm.instantiate(namespace, discreteAlarmType, options, data);
// //     };
// //     import { UAOffNormalAlarm } from "./off_normal_alarm";
// //     /**
// //      * @class AddressSpace
// //      * @method instantiateOffNormalAlarm
// //      * @param  options
// //      * @param  data
// //      * @return {UAOffNormalAlarm}
// //      */
// //     AddressSpace.prototype.instantiateOffNormalAlarm = function (options, data) {
// //         return this._resolveRequestedNamespace(options).instantiateOffNormalAlarm(options, data);
// //     };
// //     utils.setDeprecated(AddressSpace,"instantiateOffNormalAlarm","use Namespace#instantiateOffNormalAlarm instead");
// //     Namespace.prototype.instantiateOffNormalAlarm = function (options, data) {
// //         const namespace = this;
// //         return UAOffNormalAlarm.instantiate(namespace, "OffNormalAlarmType", options, data);
// //     };
//
// };
