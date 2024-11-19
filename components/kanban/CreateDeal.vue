<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";

import { defineProps } from "vue";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { DB } from "~/lib/appwrite";
import { v4 as uuid4 } from "uuid";

import type { IDeal } from "~/types/deals.types";

const isOpenForm = ref(false);

interface IDealFormsState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}
const props = defineProps({
  status: {
    type: String,
    default: "",
    required: true,
  },
  refetch: {
    type: Function,
  },
});

const { handleSubmit, defineField, handleReset } = useForm<IDealFormsState>({
  initialValues: {
    status: props.status,
  },
});

const [name, nameAttrs] = defineField("name");
const [price, priceAttrs] = defineField("price");
const [custommerEmail, customerEmailAttrs] = defineField("customer.email");
const [custommerName, custommerEmailAttrs] = defineField("customer.name");

const { mutate, isPending } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormsState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid4(), data),
  onSuccess() {
    props.refetch && props.refetch();
    handleReset();
  },
});

const onSubmit = handleSubmit((data) => mutate(data));
</script>

<template>
  <div>
    <div class="text-center mb-2">
      <button class="transition-all opacity-5 hover:opacity-100 hover:text-[#a252c8]" @click="isOpenForm = !isOpenForm">
        <Icon v-if="isOpenForm" name="radix-icons:arrow-up" class="fade-in-100 fade-out-0" size="35" />
        <Icon v-else name="radix-icons:plus-circled" class="fade-in-100 fade-out-0" size="35" />
      </button>
    </div>
    <form v-if="isOpenForm" class="form" @submit="onSubmit">
      <Input class="input" placeholder="Name" v-model="name" v-bind="nameAttrs" />
      <Input class="input" placeholder="Price" v-model="price" v-bind="priceAttrs" />
      <Input class="input" placeholder="Email" v-model="custommerEmail" v-bind="customerEmailAttrs" />
      <Input class="input" placeholder="Name" v-model="custommerName" v-bind="custommerEmailAttrs" />
    </form>
    <button class="btn" :disabled="isPending">{{ isPending ? "Creating..." : "Create" }}</button>
  </div>
</template>

<style scoped>
.input {
  @apply border-[#161c26] mb-2 placeholder:text-[#748092] focus:border-border transition-colors;
}

.btn {
  @apply text-xs border py-1 px-2 rounded border-[#161c26] hover:border-[#482c65] transition-colors text-[#aebed5] hover:text-white;
}

.form {
  @apply mb-3 block;
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    @apply border-[#a252c83d];
    transform: translateY(-35px);
    opacity: 0.4;
  }

  90% {
    @apply border-[#a252c83d];
  }

  to {
    @apply border-transparent;
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
