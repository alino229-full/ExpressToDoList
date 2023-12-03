<template>
  <section class="w-full">
    <div class="w-full  mx-auto bg-white xl:py-32 md:w-4/5 lg:w-4/5 xl:w-4/5  shadow-xl rounded-lg py-20 px-8">
      <h1
          class="mb-4 -mt-3 text-2xl font-extrabold leading-snug tracking-tight text-left text-gray-900 md:text-4xl"
      >
       Inscription
      </h1>
      <div role="alert" v-if="error.status">
        <div class="rounded border-s-4 border-red-500 bg-red-50 p-4">
          <div class="mt-2 text-sm block font-medium text-red-800">{{ error.errorMessage }}</div>
        </div>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="register()" :validation-schema="schemaLogin">
        <label class="block">
          <span class="block mb-1 text-xs font-medium text-gray-700">Email</span>
          <BaseInput v-model="form.email" type="email" placeholder=" Entrer votre Email" />

        </label>
        <label class="block">
          <span class="mb-1 text-xs font-medium text-gray-700 flex justify-between items-center"
          ><span>Mot de passe</span>
            <span class="h-4 w-4 text-black inline-block mr-4"
            ><svg
                viewBox="0 0 16 16"
                fit=""
                fill="currentColor"
                height="100%"
                width="100%"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                role="img"
                aria-labelledby="lock-s-title-1 lock-s-desc-2"
            >
                <path
                    d="M13.5 7H12V3.922C12 1.756 10.21 0 8 0S4 1.756 4 3.922V7H2.5a1 1 0 00-1 1v7a1 1 0 001 1h11a1 1 0 001-1V8a1 1 0 00-1-1zM5 3.922C5 2.311 6.346 1 8 1s3 1.31 3 2.922V7H5V3.922z"
                ></path>
                <title id="lock-s-title-1">
                  Garantie de sécurité des Services bancaires numériques RBC
                </title>
                <desc id="lock-s-desc-2">Garantie de sécurité</desc>
              </svg></span
            ></span
          >
          <BaseInput v-model="form.password" type="password" placeholder=" Entrer votre mot de passe" />
        </label>

        <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          <span>Se connecter</span>

        </button>

      </form>
      <div class="pt-6 mt-6 text-sm font-medium text-gray-700 border-t border-gray-200">
        Vous n'avez pas encore un compte?
        <router-link to="/register" class="text-blue-600 hover:text-blue-400"
        >S'inscrire</router-link
        >
        <br />
        <br />
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import {Form} from "vee-validate";

const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    await axios.post('https://monapi.com/register', {
      email: email.value,
      password: password.value
    });
    await router.push('/login'); // Redirige vers la page de connexion après l'inscription
  } catch (error) {
    console.error(error);
    // Traite les erreurs d'inscription ici
  }
};
</script>
