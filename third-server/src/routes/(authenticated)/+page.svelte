<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { onDestroy } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  $: clicks = data.clicks ?? 0;
  $: users = data.users ?? [];

  // if browser open stream to get new scores from other users

  if (browser) {
    const ac = new AbortController();
    const signal = ac.signal;

    async function stream() {
      try {
        /* GET request to +server.ts */
        const response = await fetch("/", {
          signal,
        });

        /* get the reader for events */
        const reader = response.body
          ?.pipeThrough(new TextDecoderStream())
          .getReader();

        while (reader) {
          /* read stuff indefinitely */
          const { value, done } = await reader.read();
          if (done) break;
          const message = JSON.parse(value);

          /* add the new message */
          if (message) {
            console.log(message);
          }
        }
        ac.abort();
      } catch (e) {
        console.log("error stream closure");
      }
    }
    stream();

    onDestroy(() => {
      ac.abort();
    });
  }
</script>

<link
  href="https://fonts.googleapis.com/css?family=Albert Sans"
  rel="stylesheet"
  type="text/css"
/>
<div class="box">
  <h2 style="color: white;">Leaderboard:</h2>

  {#each users as user}
    {#if user.username && user.clicks}
      <p class="scoreboard">{user?.username + " : " + user?.clicks}</p>
    {/if}
  {/each}
</div>

<form use:enhance action="?/click" method="POST">
  <button class="click" type="submit" style="--multiplier: {clicks / 10}"
    >{data.clicks}</button
  >
</form>

<!-- <button {clicks}></button> -->

<style>
  h2 {
    color: rgb(0, 0, 0);
    font-family: "Albert Sans";
    font-size: 110%;
  }

  .scoreboard {
    color: rgb(255, 255, 255);
    font-family: "Albert Sans";
    z-index: 1;
    text-align: left;
    margin-left: 5%;
  }

  .box {
    background-color: rgb(133, 146, 158);
    width: 180px;
    height: 230px;
    position: absolute;
    left: 80%;
    z-index: 0;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 7px rgb(45, 45, 45);
  }

  .click {
    height: calc(50px + (0.15 * var(--multiplier) * 50px));
    width: calc(50px + (0.15 * var(--multiplier) * 50px));
    background-color: rgb(133, 146, 158);
    border-radius: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 600px;
    max-height: 600px;
    overflow: clip;
    position: absolute;
    font-size: xx-large;
  }

  @media (max-width: 600px) {
    .box {
      width: 50%;
      margin-left: 0%;
    }
  }
</style>
