<script setup lang="ts">
import type { IColumn, ICard } from "@/components/kanban/kanban.types";
import { ref } from "vue";

useSeoMeta({
  title: "Home | CRM system",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumn = ref<IColumn | null>(null);
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div>
      <Card class="mb-3" draggable="true">
        <CardHeader role="button">name card</CardHeader>
        <CardContent>Компания</CardContent>
        <CardFooter>Date</CardFooter>
      </Card>
    </div>
  </div>
</template>
