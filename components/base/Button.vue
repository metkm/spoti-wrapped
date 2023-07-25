<template>
  <button 
    class="
      bg-slate-600 hover:bg-slate-500 text-neutral-200 rounded-full px-4 pr-5 py-2 text-sm
      flex gap-1 items-center
    "
  >
    <slot name="icon">

    </slot>
    <slot></slot>
  </button>
</template>
