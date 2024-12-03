<script setup lang="ts">
import { computed, ref } from "vue";
import { ChevronLeftIcon } from "lucide-vue-next";

const formData = ref({
  fullName: "Jane Doe",
  email: "jane@gmail.com",
  phone: "123 - 456 - 7890",
});

const profileState = ref("view");

const handleEditProfile = () => {
  if (profileState.value === "view") {
    profileState.value = "edit";
  } else {
    profileState.value = "view";
  }
};

const isDisabled = computed(() => {
  return profileState.value === "view";
});

const handleSubmit = (event: Event) => {
  console.log(event);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="flex items-center mb-8">
      <RouterLink to="/">
        <button class="p-2">
          <ChevronLeftIcon class="w-6 h-6" />
        </button>
      </RouterLink>
      <h1 class="text-2xl font-semibold mx-auto pr-8">
        {{ profileState === "edit" ? "Edit" : "" }} Profile
      </h1>
    </div>

    <!-- Profile Section -->
    <form @submit.prevent="handleSubmit" class="space-y-6 max-w-md mx-auto">
      <div class="flex flex-col items-center mb-8">
        <div class="w-32 h-32 rounded-full overflow-hidden bg-blue-100 mb-4">
          <img
            src="../assets/images/Avatar.png"
            alt="Profile picture"
            class="w-full h-full object-cover"
          />
        </div>
        <h2 class="text-xl font-semibold mb-1">Jane Doe</h2>
        <p class="text-gray-600">jane@gmail.com | +01 234 567 89</p>
      </div>

      <!-- Form -->
      <div class="space-y-6 max-w-md mx-auto">
        <!-- Full Name -->
        <div class="space-y-2">
          <label class="text-sm text-gray-600 block">Full name</label>
          <input
            type="text"
            :disabled="isDisabled"
            v-model="formData.fullName"
            class="w-full p-4 disabled:bg-gray-100 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        <!-- Email -->
        <div class="space-y-2">
          <label class="text-sm text-gray-600 block">Email</label>
          <input
            type="email"
            :disabled="isDisabled"
            v-model="formData.email"
            class="w-full p-4 disabled:bg-gray-100 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <!-- Phone Number -->
        <div class="space-y-2">
          <label class="text-sm text-gray-600 block">Phone Number</label>
          <div class="relative">
            <div
              class="absolute left-4 top-1/2 -translate-y-1/2 flex items-center"
            >
              <img
                src="https://flagcdn.com/w20/us.png"
                alt="US flag"
                class="w-5 h-auto mr-2"
              />
            </div>
            <input
              type="tel"
              :disabled="isDisabled"
              v-model="formData.phone"
              class="w-full p-4 pl-14 disabled:bg-gray-100 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 - 456 - 7890"
            />
          </div>
        </div>

        <button
          class="w-full bg-[#2B4877] text-white py-4 rounded-lg font-medium hover:bg-[#1d325a] transition-colors mt-8"
          @click="handleEditProfile"
        >
          {{ isDisabled ? "Edit" : "Submit" }}
        </button>
      </div>
    </form>
  </div>
</template>
