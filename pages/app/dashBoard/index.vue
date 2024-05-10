<template>
  <div
    class="flex flex-col items-center h-screen pt-6 bg-slate-700"
  >
    <router-link to="/" class="text-white mb-6"
      >Go to Home Page</router-link
    >

    <h1 class="text-3xl font-semibold mb-4">
      Task Board
    </h1>

    <div class="mb-6">
      <input
        v-model="newTask"
        class="min-w-10 border-b-[1px] border-red-600 outline-none bg-transparent p-2 mr-2"
        type="text"
        placeholder="Add a task..."
        @keypress.enter="addTask"
      />
      <button
        @click="addTask"
        class="bg-green-700 px-4 py-2 border border-gray-300 rounded-lg w-20 outline-none"
        type="submit"
      >
        ADD
      </button>
    </div>

    <div class="tasks"></div>
    <!-- <div>
      <div
        class="w-[400px] p-2 rounded-md flex items-center content-center justify-between bg-slate-200"
      >
        <p>TASK</p>
        <div class="flex gap-4">
          <button
            class="p-3 bg-green-700 min-w-20 rounded-md"
          >
            EDIT
          </button>
          <button
            class="p-3 bg-red-600 min-w-20 rounded-md"
          >
            DELETE
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTask: "",
    };
  },

  methods: {
    addTask() {
      console.log("addTask");
      this.$store;
      console.log("this.$store", this.$store);
      //   if (this.newTask) {
      //     this.$store.commit(
      //       "ADD_TASK",
      //       this.newTask
      //     );
      //     this.newTask = "";
      //   }
    },
  },
};
</script>

<style lang="scss" scoped></style>
