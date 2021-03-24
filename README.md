# CodersCamp 2020 - Projekt końcowy (FullStack — Node.js + React)

**CodersCamp (coderscamp.edu.pl) - Największy otwarty kurs programowania webowego**

## Zespół projektowy

Zespół pracował w ramach kursu [CodersCamp](https://coderscamp.pl/).
Aplikację wykonali uczestnicy kursu przy pomocy mentora.
Zachęcamy do odwiedzenia profili członków zespołu, w celu zapoznania się z ich portfolio.

**Mentor**: [Hubert Kawałek](https://github.com/htk4)

**Uczestnicy**:

-   [Anna Marszałek](https://github.com/Ania-Em)
-   [Mateusz Baciak](https://github.com/bat098)
-   [Mateusz Król](https://github.com/KrolMateusz)
-   [Mateusz Kmieć](https://github.com/Haivex)
-   [Tomasz Dudek](https://github.com/dudeek)
-   [Weronika Dziedzic](https://github.com/blackrabbit2)

## Demo

Wersja demonstracyjna aplikacji jest dostępna [TUTAJ](https://coders-camp-schronisko.herokuapp.com/api).

Aplikacja została wykonana wg dostarczonych przez organizatorów CodersCamp wymagań.
Szablon projektu dostępny jest [TUTAJ](https://github.com/CodersCamp2020/CodersCamp2020.Project.FullStack-Node-React.Cinema).

## Cel projektu

Celem projektu było napisanie wpełni funkcjionalnego REST API wykorzystując dotychczas nabytą wiedzę z następujących technologi: html, css, javascript, typescript, nodejs, reactjs.
Zespół projektowy zdecydował się na stworzenie aplikacji schroniska dla zwierząt.

## Wymagania funkcjonalne

### Aplikacja umożliwia:

-   założenie konta przez użytkownika,
-   wysyłanie powiadomień przy pomocy skrzynki pocztowej,
-   aktywacja konta uytkownika,
-   operacje typu CRUD dla uytkownika, zwierząt, formularzy, wniosków
-   autoryzacja i uwierzytelnianie użytkownika,
-   złożenie formularza adopcyjnego,
-   złożenie formularza kandydata na wolontariusza,
-   utworzenie formularza zgłoszeniowego do adopcji zwierzęcia,
-   utworzenie formularza kandydata na wolontariusza,
-   wybór daty spotkania w schornisku,
-   złożenie dotacji dla schroniska,
-   złożenie dotacji dla zwierzęcia,

### Wymagania funkcjonalne (szczegółowo):

1. Użytkownik ma możliwość zarejestrować się w systemie, podając imię, nazwisko, hasło, powtórzone hasło, telefon, datę urodzenia i adres e-mail.
2. Użytkownik ma możliwość zalogować się w systemie, podając adres e-mail i hasło.
3. Użytkownik otrzymuje wiadomość mailową z informacją o założeniu konta i linkiem aktywacyjnym.
4. Użytkownik ma możliwość zresetować swoje hasło do konta.
5. Użytkownik otrzymuje wiadomość mailową z informacją o nowym haśle.
6. Użytkownik ma możliwość aktualizować dane osobowe.
7. Użytkownik ma możliwość usunąć swoje konto.
8. Użytkownik ma możliwość przeglądać zwierzęta, które są gotowe do adopcji.
9. Użytkownik wybiera formularz adopcyjny zwierzęcia i wypełnia go danymi.
10. Użytkownik ma możliwość złożyć formularz kandydata na wolontariusza.
11. Użytkownik ma możliwość wypełnić tylko jeden formularz dla jednego zwierzęcia.
12. Użytkownik otrzymuje wiadomość mailową z informacją o złożeniu formularza.
13. Po zaakceptowaniu formularza adopcyjnego użytkownik ma możliwość wybrać datę spotkania ze zwierzęciem.
14. Użytkownik ma możliwość przeczytać szczegóły dotyczące zwierzęcia.
15. Użytkownik ma możliwość obserwować status swojego formularza na koncie uytkownika.
16. Użytkownik ma możliwość złożyć formularz tylko w przypadku założonego i potwierdzonego mailowo konta.
17. Użytkownik zostaje poinformowany mailowo o zmianach statusu wniosków.
18. Pozsotali użytkownicy zostają poinformowani mailowo o odrzuconym wniosku, w przypadku gdy inny użytkownik zaadoptował już dane zwierzę.
19. Użytkownik ma możliwość złożyć formularz kandydata na wolontariusza.

#### Przykładowa funkcjonalność aplikacji

![apiheroku](https://user-images.githubusercontent.com/56504859/112295862-9f43c800-8c94-11eb-94a5-1d25bc7a737d.gif)

### Zrealizowane dodatkowe zadania

1. Utowrzony został szablon graficzny aplikacji w programie Figma.

## Development aplikacji

Jeśli chcesz pomóc, w dalszym rozwoju aplikacji, z chęcią przyjmiemy Twoje Pull Requesty.

### Wykorzystywane technologie

W trakcie developmentu wykorzystujemy:

-   NodeJS
-   Swagger
-   Tsoa
-   Docker
-   Herokz
-   ReactJS
-   TypeORM
-   PostgreSQL
-   GitHub workflow

### Schemat bazy danych

<img src=".github/images/DB.png">

### Uruchomienie projektu

Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm ci`
2. Uruchom kontenery z bazą danych oraz narzędziem pgAdmin: `docker-compose up`
3. Wystartuj serwer developerski `npm run dev`

Aplikacja będzie dostępna pod adresem [localhost:3080/](http://localhost:3080), natomiast API pod adresem [localhost:8000/](http://localhost:8000/api)

Kod produkcyjny aplikacji umieszczamy w katalogu `build`.

### Uruchomienie testów

Aby uruchomić testy aplikacji, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm ci` (jeśli nie zrobiłeś już tego wcześniej).
2. Uruchom wszystkie testy, wykonując komendę: `npm run test`.

Dostępne są także testy tylko dla serwera `npm run server:test`, dla testów z pokryciem kodu `npm run server:test:cov`.
Testy tylko dla aplikacji webowej `npm run web:test`, dla testów z pokryciem kodu `npm run web:test:cov`.
Kod testów umieszczamy w katalogu `test`.

### Organizacja pracy

Praca zespołu była organizowana przy użyciu narzędzi dostarczanych przez GitHub.
Zadania opisywaliśmy za pomocą GitHub Issues i dzieliśmy czas ich wykonania na tygodnie za pomocą GitHub Projects.
Każde z zadań było estymowane przez mentora, dzięki czemu staraliśmy się, aby liczba punktów przypadająca w danym tygodniu na każdą osobę w zespole była podobna.
