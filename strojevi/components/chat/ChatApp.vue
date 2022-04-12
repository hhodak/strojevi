<template>
  <div>
    <Header />
    <div class="py-10">
      <header>
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between"
        >
          <button class="button" v-on:click="exitChat()">Exit chat</button>
        </div>
      </header>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <hr />
          <div v-for="message in messages" :key="message.id">
            <b>{{ message.user }}</b
            >: {{ message.text }}
          </div>
        </div>
        <div>
          <textarea
            class="
              mt-1
              focus:ring-indigo-500 focus:border-indigo-500
              block
              w-full
              shadow-md shadow-black
              sm:text-sm
              border-gray-300
              rounded-md
            "
            v-model="text"
            v-on:keyup.enter="sendMessage()"
            placeholder="Type your message here..."
          ></textarea>
          <div class="mx-0 my-auto">
            <button class="button" v-on:click="sendMessage()">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "ChatApp",
  data() {
    return {
      currentUser: "",
      text: "",
      messages: [],
    };
  },
  beforeDestroy() {
    this.socketInstance.disconnect();
  },
  beforeMount() {
    console.log(this.socketInstance);
    this.socketInstance = io("http://localhost:5999");
    console.log(this.socketInstance);
    this.currentUser = this.$auth.user.username;

    this.socketInstance.on("message:received", (data) => {
      this.messages = this.messages.concat(data);
    });

    console.log(this.socketInstance);
  },
  methods: {
    sendMessage() {
      this.addMessage();
      this.text = "";
    },
    addMessage() {
      const newMessage = {
        id: new Date().getTime(),
        text: this.text,
        user: this.currentUser,
      };
      this.messages = this.messages.concat(newMessage);

      this.socketInstance.emit("message", newMessage);
    },
    exitChat() {
      this.socketInstance.disconnect();
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>