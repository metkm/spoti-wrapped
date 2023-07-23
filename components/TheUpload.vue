<script setup lang="ts"></script>

<template>
  <section class="rounded-2xl p-4 space-y-4 max-w-5xl text-slate-700 bg-slate-100">
    <h1 class="text-xl font-semibold text-center">How to use this thing?</h1>

    <p>
      First, you should go to the
      <a href="https://www.spotify.com/us/account/privacy/" class="text-green-600">Spotify Privacy</a>
      page and request your Extended Streaming History, wait for Spotify to send
      your data to your email.
    </p>

    <p>
      If you have your Data downloaded unzip it and select all the files that
      ends with .json
    </p>

    <BaseButton>
      <template #icon>
        <IconsUpload />
      </template>

      Upload Spotify Data
    </BaseButton>
  </section>
</template>
