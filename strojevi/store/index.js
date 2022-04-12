import { CrudManager } from "~/components/crudManager/crudManager.js"

const crudManager = new CrudManager();

export const state = () => ({
    machines: [],
    users: [],
    roles: [],
    logs: [],
})
export const mutations = {
    //MACHINES
    async fillMachines(state, machines) {
        state.machines = machines
    },
    async removeMachine(state, machineId) {
        state.machines = state.machines.filter((machine) => machine.id != machineId)
    },
    async addMachine(state, machine) {
        state.machines.push(machine)
    },
    async updateMachine(state, machine) {
        for (var i in state.machines) {
            if (state.machines[i].id == machine.id) {
                state.machines[i] = machine;
                break;
            }
        }
    },

    //ROLES
    async fillRoles(state, roles) {
        state.roles = roles
    },
    async removeRole(state, roleId) {
        state.roles = state.roles.filter((role) => role.id != roleId)
    },
    async addRole(state, role) {
        state.roles.push(role)
    },
    async updateRole(state, role) {
        for (var i in state.roles) {
            if (state.roles[i].id == role.id) {
                state.roles[i] = role;
                break;
            }
        }
    },

    //USERS
    async fillUsers(state, users) {
        state.users = users
    },
    async removeUsers(state, userId) {
        state.users = state.users.filter((user) => user.id != userId)
    },
    async addUser(state, user) {
        state.users.push(user)
    },
    async updateUser(state, user) {
        for (var i in state.users) {
            if (state.users[i].id == user.id) {
                state.users[i] = user;
                break;
            }
        }
    },

    //LOGS
    async fillLogs(state, logs) {
        state.logs = logs
    },
    async removeLog(state, logId) {
        state.logs = state.logs.filter((log) => log.id != logId)
    },
    async addLog(state, log) {
        state.logs.push(log)
    },
}
export const actions = {
    async nuxtServerInit({ commit }) {
        commit("fillMachines", await crudManager.loadMachines());
        commit("fillRoles", await crudManager.loadRoles());
        commit("fillUsers", await crudManager.loadUsers());
        commit("fillLogs", await crudManager.loadLogs());
    },
    //MACHINES
    async removeMachine({ commit }, machineId) {
        await crudManager.deleteMachine(machineId)
        commit("removeMachine", machineId);
    },
    async addMachine({ commit }, machine) {
        const newMachine = await crudManager.createMachine(machine)
        commit("addMachine", newMachine);
    },
    async updateMachine({ commit }, machine) {
        const updatedMachine = await crudManager.updateMachine(machine)
        commit("updateMachine", updatedMachine);
    },
    //ROLES
    async removeRole({ commit }, roleId) {
        await crudManager.deleteRole(roleId)
        commit("removeRole", roleId);
    },
    async addRole({ commit }, role) {
        const newRole = await crudManager.createRole(role)
        commit("addRole", newRole);
    },
    async updateRole({ commit }, role) {
        const updatedRole = await crudManager.updateRole(role)
        commit("updateRole", updatedRole);
    },
    //USERS
    async removeUser({ commit }, userId) {
        await crudManager.deleteUser(userId)
        commit("removeUser", userId);
    },
    async addUser({ commit }, user) {
        const newUser = await crudManager.createUser(user)
        commit("addUser", newUser);
    },
    async updateUser({ commit }, user) {
        const updatedUser = await crudManager.updateUser(user)
        commit("updateUser", updatedUser);
    },
    //LOGS
    async removeLog({ commit }, logId) {
        await crudManager.deleteLog(logId)
        commit("removeLog", logId);
    },
    async addLog({ commit }, log) {
        const newLog = await crudManager.createLog(log.action, log.userId)
        commit("addLog", newLog);
    },
}
export const getters = {
    //MACHINES
    getMachines: (state) => {
        return state.machines
    },
    getMachine: (state) => (machineId) => {
        return state.machines.find((machine) => machine.id == machineId)
    },
    //ROLES
    getRoles: (state) => {
        return state.roles
    },
    getRole: (state) => (roleId) => {
        return state.roles.find((role) => role.id == roleId)
    },
    //USERS
    getUsers: (state) => {
        return state.users
    },
    getUser: (state) => (userId) => {
        return state.users.find((user) => user.id == userId)
    },
    //LOGS
    getLogs: (state) => {
        return state.logs
    },
    getLog: (state) => (logId) => {
        return state.logs.find((log) => log.id == logId)
    },
}