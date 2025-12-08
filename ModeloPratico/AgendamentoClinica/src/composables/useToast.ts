import { ref } from 'vue'

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

export function useToast() {
  function trigger(message: string, type: 'success' | 'error' = 'success') {
    toastMessage.value = message
    toastType.value = type
    showToast.value = true

    setTimeout(() => (showToast.value = false), 2500)
  }

  return {
    showToast,
    toastMessage,
    toastType,
    trigger,
  }
}
