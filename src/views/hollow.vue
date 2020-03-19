<template>
  <div class="row">
    <div class="col-md-6">
      <div class="info info-horizontal" stype="padding: 0px 0 30px;">
        <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="1s">
          <div class="icon icon-primary">
            <i class="material-icons">accessibility_new</i>
          </div>
          <div class="description">
            <h4 class="info-title">
              Принимай заяки сразу в Trello
            </h4>
            <p class="description">
              Это личный кабинет для ваших пользователей, позволяющий принимать различные виды
              заявок сразу в Trello. При этом вашим пользователям не нужна учетная запись в самом
              Trello.
            </p>
          </div>
        </div>

        <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="2s">
          <div class="icon icon-rose">
            <i class="material-icons">gesture</i>
          </div>
          <div class="description">
            <h4 class="info-title">
              Различные сценарии
            </h4>
            <p class="description">
              Вы можете использовать сервис для приема заявок на техническую поддержку, запрос на
              обслуживание, заказ канцелярии и т.д. Вы можете принимать заявки в различные доски
              Trello.
            </p>
          </div>
        </div>

        <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="3s">
          <div class="icon icon-rose">
            <i class="material-icons">phonelink</i>
          </div>
          <div class="description">
            <h4 class="info-title">
              На всех устройствах
            </h4>
            <p class="description">
              Мы постарались сделать так, чтобы наш сервис открывался одинаково хорошо на всех
              устройствах! Как на больших мониторах, так и на маленьких смартфонах.
            </p>
          </div>
        </div>
        <br />
        <div class="wow fadeInUp" data-wow-duration="2s" data-wow-delay="4s">
          <center>
            <router-link to="/registration">
              <button type="button" class="btn btn-info btn-round">
                Регистрация
              </button>
            </router-link>
            <router-link to="/feature">
              <button type="button" class="btn btn-secondary btn-round">
                Посмотреть все возможности
              </button>
            </router-link>
          </center>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card card-raised card-carousel">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active" style="height:100%">
              <img class="d-block w-100 h-100" src="img/slides/slide2.jpg" alt="Первый слайд" />
              <div class="carousel-caption d-none d-md-block">
                <h4>
                  <i class="material-icons">contacts</i>
                  Простой и функциональный личный кабинет с заявками для ваших клиентов.
                </h4>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 h-100" src="img/slides/slide3.jpg" alt="Второй слайд" />
              <div class="carousel-caption d-none d-md-block">
                <h4>
                  <i class="material-icons">call</i>
                  Все популярные способы связи
                </h4>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 h-100" src="img/slides/slide1.jpg" alt="Третий слайд" />
              <div class="carousel-caption d-none d-md-block">
                <h4>
                  <i class="material-icons">panorama</i>
                  Большой выбор красивых фонов
                </h4>
              </div>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100 h-100" src="img/slides/slide4.jpg" alt="Четвертый слайд" />
              <div class="carousel-caption d-none d-md-block">
                <h4>
                  <i class="material-icons">phone_iphone</i>
                  Свой короткий адрес и QR код
                </h4>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true" />
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true" />
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
