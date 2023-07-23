<template>
  <button 
    class="flex gap-2 items-center shadow-lg rounded-full px-8 py-3 text-sm text-neutral-100 bg-slate-600 hover:bg-slate-500"
  >
    <slot name="icon">

    </slot>
    <slot></slot>
  </button>
</template>
