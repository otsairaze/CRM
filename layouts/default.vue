<script lang="ts" setup>
import { account } from "@/lib/appwrite";
import { useAuthStore, useIsLoadingStore } from "@/store/auth.store";
import { Layout } from "lucide-vue-next";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get();
    if (user) store.set(user);
  } catch (error) {
    router.push("/login");
  } finally {
    useIsLoadingStore().set(false);
  }
});
</script>

<template>
  <LayoutLoader v-if="useIsLoadingStore().isLoading" />
  <section v-else class="grid" style="min-height: 100vh">
    <LayoutSidebar />
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>
