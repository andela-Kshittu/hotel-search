const utils = require("../../utils");
const Approval = require("../../models/approval").Approval;
const approvalService = require("../../services/approval");

jest.mock("../../models/approval");

describe("Test create approval.", () => {
  it("It should create approval request", done => {
    const data = {
      type: utils.roles.user,
      from: "5cbe06e27950076a72c0c280",
      approvingParty: "5cbdde690b305f61228920f6",
      transaction: "5cbe06e27950076a72c0c27e"
    };

    approvalService.create(data);

    expect(Approval).toHaveBeenCalledTimes(1);

    // mock.instances is available with automatic mocks:
    const mockApprovalInstance = Approval.mock.instances[0];
    const mockSaveMethod = mockApprovalInstance.save;
    expect(mockSaveMethod).toHaveBeenCalledTimes(1);

    done();
  });
});
