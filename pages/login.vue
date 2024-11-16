<script setup lang="ts">
import { account } from "@/lib/appwrite";
import { useAuthStore, useIsLoadingStore } from "@/store/auth.store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useSeoMeta } from "@unhead/vue";
import { v4 as uuidv4 } from "uuid";

useSeoMeta({
  title: "Login | CRM system",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  try {
    isLoadingStore.set(true);
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: true,
      });
    }
    emailRef.value = "";
    passwordRef.value = "";
    nameRef.value = "";

    await router.push("/");
    isLoadingStore.set(false);
  } catch (error) {
    isLoadingStore.set(false);
    console.log(error);
  }
};

const register = async () => {
  try {
    await account.create(uuidv4(), emailRef.value, passwordRef.value, nameRef.value);

    await login();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="rounded bg-sidebar w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>

      <form>
        <Input placeholder="Email" type="email" class="mb-3" v-model="emailRef" />
        <Input placeholder="Password" type="password" class="mb-3" v-model="passwordRef" />
        <Input placeholder="Name" type="Name" class="mb-3" v-model="nameRef" />

        <div class="flex items-center justify-center gap-5">
          <button type="button" @click="login">Login</button>
          <button type="button" @click="register">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
button {
  padding: 10px 20px;
  background-color: rgb(55, 55, 55);
}

button:hover {
  background-color: rgb(70, 70, 70);
  transition: all 0.3s ease-in-out;
}
</style>
