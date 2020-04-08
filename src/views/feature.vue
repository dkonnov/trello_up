<template>
  <div class="row">
    <div
      class="col-lg-5 col-md-8 ml-auto mr-auto"
      style="padding-left: 50px; padding-right: 30px;padding-bottom: 50px;"
    >
      <br />
      <div class="icon icon-primary">
        <i class="material-icons" style="font-size:3.85rem;">accessibility_new</i>
      </div>
      <div class="section-description">
        <h3 class="info-title">
          Проще и эффективней
        </h3>
        <h5 class="description">
          <i>Наша система идеально подходит для небольших команд, отделов и организаций. </i
          ><br /><br />
          Мы предлагаем вам не полностью новую систему приема заявок, а интеграцию с самой
          популярной системой канбан Trello. Используя наше решение вы сможете очень быстро внедрить
          подачу заявок в вашей организации.<br />
          По сути это личный кабинет для ваших клиентов интегрированный с Trello. Клиенты подают
          заявки в своем личном кабинете, а ваши специалисты работают с ними в Trello.<br />Создание
          учетных записей для пользователей в самом Trello не трубуется.<br /><br />
        </h5>

        <br />
        <div class="wow fadeInUp" data-wow-duration="2s" data-wow-delay="4s">
          <center>
            <router-link to="/registration">
              <button type="button" class="btn btn-info btn-round">
                {{ $t('message.createAccaut') }}
              </button>
            </router-link>
          </center>
          <br /><br />
        </div>
      </div>
    </div>
    <div
      class="col-lg-6 col-md-12 ml-auto"
      style="padding-left: 30px; padding-right: 30px;padding-bottom: 40px;"
    >
      <br />
      <center>
        <h3 class="card-title">
          Все возможности
        </h3>
      </center>
      <div class="card-pricing">
        <ul>
          <li>
            <i class="material-icons text-success">check</i> Личный кабинет пользователя в котором
            отображаются поданные им заявки
          </li>
          <li>
            <i class="material-icons text-success">check</i> Интеграция поданных заявок с Trello
          </li>
          <li>
            <i class="material-icons text-danger">check</i> Подключение нескольких досок Trello к
            сервису
          </li>
          <li>
            <i class="material-icons text-danger">check</i> Подача заявок с использованием коротких
            ссылок (по короткой ссылке отображаются задачи поданные на конкретную доску Trello)
          </li>
          <li>
            <i class="material-icons text-danger">check</i> Отображение текущей стадии исполнения
          </li>
          <li><i class="material-icons text-danger">check</i> Отображение исполнителей</li>
          <li><i class="material-icons text-danger">check</i> Отображение срока исполнения</li>
          <li>
            <i class="material-icons text-danger">check</i> Переписка по конкретной задаче
            (комментирование)
          </li>
          <li><i class="material-icons text-danger">check</i> Отображение прикрепленных файлов</li>
          <li>
            <i class="material-icons text-danger">schedule</i> Прикрепленние файлов пользователем
          </li>
          <li><i class="material-icons text-danger">check</i> Отмена задач пользователем</li>
          <li>
            <i class="material-icons text-danger">schedule</i> Шаблонные ответы пользователю по
            задачам
          </li>
          <li>
            <i class="material-icons text-danger">schedule</i> Уведомление пользователя об
            изменениях
          </li>
        </ul>
      </div>
      <div />
    </div>
  </div>
</template>

<style scoped>
.card-pricing ul li {
  color: #999;
  text-align: left;
  padding: 6px 0px;
  border-bottom: 1px solid hsla(0, 0%, 60%, 0);
}
.card-pricing ul {
  list-style: none;
  padding: 0;
  max-width: 360px;
  margin: 10px auto;
}
</style>
