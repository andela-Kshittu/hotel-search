const utils = require("../utils");
const Approval = require("../models/approval").Approval;

const create = async (data) => {
    const approval = new Approval();
    const { type, from, approvingParty, transaction } = data;
    Object.assign(approval, {
        type,
        from,
        approvingParty,
        transaction
    });
    // Create approval
    return await approval.save();
}

const approveOrRejectRequest = async (transactionId, approvingUser, state, type) => {
    await ensureApprovalIsPending(transactionId, approvingUser, type);
    const param = { transaction: transactionId, type };
    if (type === utils.roles.type) {
        param.approvingParty = approvingUser.id;
    }
    return await Approval.update(param, 
        { $set: { approval: state, approved: state === utils.approvals.approved, approvingParty: approvingUser.id } }, { new: true })
}

const getTransactionState = async (transaction) => {
    const requests = await Approval.find({ transaction });
    if (requests.some(req => req.approval === utils.approvals.rejected)) {
        return utils.states.denied;
    } else if (requests.some(req => req.approval === utils.approvals.pending)) {
        return utils.states.pending;
    } else {
        return utils.states.completed;
    }
}

const getOpenRequestCountForUser = async (userId) => {
    return await Approval.count({ approvingParty: userId, approval: utils.approvals.pending });
}

const ensureApprovalIsPending = async (transaction, approvingUser, type) => {
    const params = { transaction, type };

    if (type === utils.roles.user) {
        params.approvingParty = approvingUser._id
    }

    if (!approvingUser) {
        let err = new Error("Approving user must be specified!");
        err.status = 400;
        throw err;
    }

    if(type === utils.roles.admin && approvingUser.type !== utils.roles.admin) {
        let err = new Error("User is not authorized to approve this request");
        err.status = 403;
        throw err;
    }

    const request = await Approval.findOne(params);
    // Ensure transaction exists
    if (!request) {
        let err = new Error('Request not found');
        err.status = 404;
        throw err;
    }
    // I should be able able to update pending request only!
    if (request.approval !== utils.approvals.pending) {
        let err = new Error(`This request was ${request.approval}, it can not be updated!`);
        err.status = 400;
        throw err;
    }
    return request;
}


module.exports = {
    create,
    approveOrRejectRequest,
    getTransactionState,
    getOpenRequestCountForUser
};
