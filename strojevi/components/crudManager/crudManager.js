import axios from "axios";
import { UserRoles } from "~/components/enums/UserRole.js"

const server = "http://localhost:3333"

export class CrudManager {
    //LOAD
    async loadMachines() {
        let machinesArray = []
        await fetch(`${server}/machines`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                machinesArray = data
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        return machinesArray
    }

    async loadRoles() {
        let rolesArray = []
        await fetch(`${server}/roles`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                rolesArray = data
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        return rolesArray
    }

    async loadUsers() {
        let usersArray = []
        await fetch(`${server}/users`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                usersArray = data;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        return usersArray
    }

    async loadLogs() {
        let logsArray = []
        await fetch(`${server}/logs`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                logsArray = data;
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        return logsArray
    }

    //CREATE
    async createMachine(machine) {
        const newMachine = await axios.post(`${server}/machines`, {
            name: machine.name,
            description: machine.description,
            state: machine.state,
        });
        return newMachine.data
    }

    async createRole(role) {
        const newRole = await axios.post(`${server}/roles`, {
            name: role.name,
            description: role.description,
        });
        return newRole.data
    }

    async createUser(user) {
        const newUser = await axios.post(`${server}/users`, {
            username: user.username,
            password: user.password,
            fullName: user.fullName,
            email: user.email,
            status: user.status,
            role_id: user.role_id,
            isActive: user.isActive
        });
        return newUser.data
    }

    async createLog(activity, userId) {
        const newLog = await axios.post(`${server}/logs`, {
            user_id: userId,
            action: activity,
        });
        return newLog.data
    }

    //UPDATE
    async updateMachine(machine) {
        const updatedMachine = await axios.put(`${server}/machines/${machine.id}`, {
            name: machine.name,
            description: machine.description,
            state: machine.state,
        });
        return updatedMachine.data
    }

    async updateRole(role) {
        const updatedRole = await axios.put(`${server}/roles/${role.id}`, {
            name: role.name,
            description: role.description,
        });
        return updatedRole.data
    }

    async updateUser(user) {
        const updatedUser = await axios.put(`${server}/users/${user.id}`, {
            username: user.username,
            fullName: user.full_name,
            email: user.email,
            status: user.status,
            role_id: user.role_id,
        });
        return updatedUser.data
    }

    //DELETE
    async deleteMachine(machineId) {
        await axios.delete(`${server}/machines/${machineId}`);
    }

    async deleteRole(roleId) {
        await axios.delete(`${server}/roles/${roleId}`);
    }

    async deleteUser(userId) {
        await axios.delete(`${server}/users/${userId}`);
    }

    async deleteLog(logId) {
        await axios.delete(`${server}/logs/${logId}`);
    }

    //LOGIN/REGISTRATION/authorization
    async checkExistingUser(username) {
        const korisnici = await this.loadUsers()
        for (let i = 0; i < korisnici.length; i++) {
            if (korisnici[i].username == username) {
                return true;
            }
        }
        return false
    }

    async isAdmin(user) {
        return user.role_id == UserRoles.Administrator
    }

    async isCurrentUser(user, searchedUserId) {
        return user.id == searchedUserId
    }
}