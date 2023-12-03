<template>
  <section class="grid grid-cols-1 lg:grid-cols-2">
    <div class="w-full px-8 py-20 mx-auto bg-white xl:py-32 md:w-4/5 lg:w-4/5 xl:w-4/5  shadow-xl rounded-lg ">
      <h1
        class="mb-4 -mt-3 text-2xl font-extrabold leading-snug tracking-tight text-left text-gray-900 md:text-4xl"
      >
       {{isLogin?"Se connecter":"S'inscrire"}}
      </h1>
      <div role="alert" v-if="error.status">
        <div class="rounded border-s-4 border-red-500 bg-red-50 p-4">
          <div class="mt-2 text-sm block font-medium text-red-800">{{ error.errorMessage }}</div>
        </div>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="authentification()" :validation-schema="schemaLogin">
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
                <span id="lock-s-title-1">
                  Garantie de sécurité des Services bancaires numériques RBC
                </span>
                <desc id="lock-s-desc-2"></desc>
              </svg></span
            ></span
          >
          <BaseInput v-model="form.password" type="password" placeholder=" Entrer votre mot de passe" />
        </label>

        <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          <span> {{isLogin?"Valider":"Créer un compte"}}</span>

        </button>

      </form>
      <button v-if="isLogin" type="button" @click="isLogin = false" class="pt-6 mt-6 text-sm font-medium text-gray-700 border-t border-gray-200">
        Vous n'avez pas encore un compte?
        <span  class="text-blue-600 hover:text-blue-400"
          >S'inscrire</span
        >
        <br />
        <br />
      </button>
      <button v-if="!isLogin" type="button" @click="isLogin = true" class="pt-6 mt-6 text-sm font-medium text-gray-700 border-t border-gray-200">
        Vous avez déjà un compte?
        <span  class="text-blue-600 hover:text-blue-400"
          >Se connecter</span
        >
        <br />
        <br />
      </button>
    </div>
    <div class="px-4 py-20 space-y-10 bg-gray-100 xl:py-32 md:px-4 lg:px-6 xl:px-10">
      <a href="/" title="">
        <span class="text-xl font-bold">Gestion de Tâches Simplifiée</span>
      </a>
      <div class="flex space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="flex-none w-6 h-6 mt-1 text-purple-700"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <h2 class="text-xl font-medium text-purple-700">Organisez vos Journées</h2>
          <p class="mt-1 text-gray-700">Planifiez et gérez efficacement vos tâches quotidiennes.</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="flex-none w-6 h-6 mt-1 text-purple-700"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <h2 class="text-xl font-medium text-purple-700">Suivi en Temps Réel</h2>
          <p class="mt-1 text-gray-700">Restez à jour avec le suivi en temps réel des tâches.</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="flex-none w-6 h-6 mt-1 text-purple-700"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          <h2 class="text-xl font-medium text-purple-700">Collaboration Facile</h2>
          <p class="mt-1 text-gray-700">
            Collaborez aisément avec votre équipe sur des projets communs.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import * as Yup from 'yup'
import { Form } from "vee-validate";

const auth = useAuthStore()
const form = ref({
  email: "",
  password: "",

});
const loading = ref(false)
const isLogin = ref(true)
const error = ref({
  status: false,
  errorMessage: ''
})

const router = useRouter()

const schemaLogin = Yup.object().shape({
  email: Yup.string().trim().email("L'email n'est pas valide").required("L'email est requis"),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 8 caractères')
    .required('Le mot de passe est requis')
})
function getSimpleCookieValue(name : string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const csrfToken = getSimpleCookieValue('_csrf');
console.log(csrfToken);


const authentification = async () => {

  try {
    loading.value = true;
    // Validation du formulaire
    await schemaLogin.validate({ ...form.value }, { abortEarly: false });

    const response = isLogin.value ? await auth.login({ ...form.value }) : await auth.register({ ...form.value });

    if ((response?.status ?? 0) !== 200) {
      error.value.status = true;
      error.value.errorMessage = isLogin.value ? 'Identifiants de connexion incorrects' : 'Erreur lors de l\'inscription';
    } else {
      error.value.status = false;

      // Tu peux aussi gérer la redirection ou la mise à jour de l'état de l'interface utilisateur ici
      if(auth.islogged){
        await router.push('/tasks')
      }


    }
  } catch (validationError) {
    if (validationError instanceof Yup.ValidationError) {
      error.value.errorMessage = validationError.errors[0];
    } else {
      console.error(validationError);
      error.value.errorMessage = 'Une erreur s\'est produite';
    }
  } finally {
    loading.value = false;
  }
};




</script>
