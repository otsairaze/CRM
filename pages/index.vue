<script setup lang="ts">
import type { IColumn, ICard } from "@/components/kanban/kanban.types";
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import { convertCurrency } from "~/lib/convertCurrency";
import dayjs from "dayjs";

useSeoMeta({
  title: "Home | CRM system",
});

const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, isError, error, refetch } = useKanbanQuery();
</script>

<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="column in data" :key="column.id">
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
            {{ column.name }}
          </div>
          <div>
            <KanbanCreateDeal :refetch="refetch" :status="column.id" />
            <Card v-for="card in column.items" :key="card.id" class="mb-5" draggable="true">
              <CardHeader role="button">
                <CardTitle>{{ card.name }}</CardTitle>
                <CardDescription class="mt-2 block">{{ convertCurrency(card.price) }}</CardDescription>
              </CardHeader>
              <CardContent class="text-xs">
                <div>Компания</div>
                {{ card.companyName }}</CardContent
              >
              <CardFooter>
                {{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
