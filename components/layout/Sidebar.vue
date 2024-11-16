<script lang="ts" setup>
import { account } from "@/lib/appwrite";
import { useAuthStore, useIsLoadingStore } from "@/store/auth.store";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

const logout = async () => {
  useIsLoadingStore().set(true);
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
  useIsLoadingStore().set(false);
};
</script>

<template>
  <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
    <NuxtLink to="/" class="mb-10 block">
      <NuxtImg src="/logo.svg" alt="" width="140px" class="mx-auto" />
    </NuxtLink>
    <button class="absolute top-2 right-3 transition-colors hover:text-primary">
      <Icon @click="logout" name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>
