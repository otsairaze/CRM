<script setup lang="ts">
import type { IColumn, ICard } from "@/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";

useSeoMeta({
  title: "Home | CRM system",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, isError, error, refetch } = useKanbanQuery();

watch(data, (newData) => {
  console.log("Fetched data:", newData);
});
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error: {{ error?.message || "Unknown error" }}</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="(column, index) in data" :key="column.id">
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
            {{ column.name }}
          </div>
          <div v-for="(item, itemIndex) in column.items" :key="item.id">
            <Card v-if="item" class="mb-3" draggable="true">
              <CardHeader role="button">{{ item.name || "Unnamed Card" }}</CardHeader>
              <CardContent>{{ item.companyName || "Unknown Company" }}</CardContent>
              <CardFooter>{{ item.$createdAt || "Unknown Date" }}</CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
