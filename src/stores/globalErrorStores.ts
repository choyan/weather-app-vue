import { reactive } from "vue";

interface GlobalErrorState {
  error: Error | null;
  addError: (error: Error) => void;
  clearError: () => void;
}

export const globalErrorStore = reactive<GlobalErrorState>({
  error: null,
  addError(error: Error) {
    this.error = error;
  },
  clearError() {
    this.error = null;
  },
});
