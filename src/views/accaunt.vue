<template>
  <div class="accaunt">
    <center>
      <h4 class="info-title">Ваши данные</h4>

      <form @submit.prevent="accaunt">
        <!-- <div class="fields">
          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.email.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">mail</i>
              </span>
            </div>
            <input
              v-model="email"
              @input="$v.email.$touch"
              type="email"
              class="form-control"
              placeholder="Электронная почта ..."
            />
            <button v-if="$v.email.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
            <small
              v-if="$v.email.$error"
              class="form-text text-muteds small-alert"
              >Необходимо ввести адрес электронной почты, которого нет в
              системе.</small
            >
          </div>

          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.password.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">lock_outline</i>
              </span>
            </div>
            <input
              v-model="password"
              type="password"
              @input="$v.password.$touch"
              class="form-control"
              placeholder="Пароль ..."
            />
            <button v-if="$v.password.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
          </div>
          <small
            v-if="$v.password.$error"
            class="form-text text-muteds small-alert"
            >Минимум 6 символов.</small
          >

          <div
            class="input-group form-group label-floating"
            :class="{ 'has-danger': $v.password2.$error }"
          >
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="material-icons">lock_outline</i>
              </span>
            </div>
            <input
              v-model="password2"
              type="password"
              @input="$v.password2.$touch"
              class="form-control"
              placeholder="Пароль еще раз ..."
            />
            <button v-if="$v.password2.$error" class="form-control-feedback">
              <i class="material-icons">clear</i>
            </button>
          </div>
          <small
            v-if="$v.password2.$error"
            class="form-text text-muteds small-alert"
            >Пароли не совпадают.</small
          >
        </div>
        <br />

        <button
          :disabled="$v.$invalid"
          type="submit"
          class="btn btn-primary btn-round"
        >
          Зарегистрироваться
        </button>
        <br /> -->
      </form>
      <router-link to="/">
        <button type="button" class="btn btn-secondary btn-round">
          Назад
        </button>
      </router-link>
    </center>
  </div>
</template>
