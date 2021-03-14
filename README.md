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

Wersja demonstracyjna aplikacji jest dostępna [TUTAJ](https://coders-camp-schronisko.herokuapp.com/).

Aplikacja została wykonana wg dostarczonych przez organizatorów CodersCamp wymagań.
Szablon projektu dostępny jest [TUTAJ](https://github.com/CodersCamp2020/CodersCamp2020.Project.FullStack-Node-React.Cinema).

## Cel projektu

Celem projektu było napisanie aplikacji wykorzystującej dotychczas nabytą wiedzę z następujących technologi: html, css, javascript, typescript, nodejs, reactjs.
Zespół projektowy zdecydował się na stworzenie aplikacji schroniska dla zwierząt. 

## Wymagania funkcjonalne
### Aplikacja umożliwia:
- założenie konta przez użytkownika,
- autoryzacja i autentykacja użytkownika,
- złożenie formularza na adopcje zwierzęta,
- złożenie formularza na adopcje wolontariusza,
- umówienienie się na spotkanie w schronisku w celu poznania zwierzęcia,
- wybór daty spotkania w schornisku,
- dodanie zwierząt do bazy przez admina,
- utworzenie formularza zgłoszeniowego do adopcji zwierzęcia,
- złożenie dotacji dla schroniska,
- 


### Wymagania funkcjonalne (szczegółowo):
1. Użytkownik może zarejestrować się w systemie, podając imię, nazwisko, hasło i adres e-mail.
2. Użytkownik może zalogować się w systemie, podając adres e-mail i hasło.
3. Użytkownik otrzymuje wiadomość mailową z informacją o założeniu konta.
4. Użytkownik może zresetować swoje hasło do konta.
5. Użytkownik otrzymuje wiadomość mailową z informacją o nowym haśle.
6. Użytkownik może przeglądać zwierzęta. Czyli takie, które są dostępne do adopcji.
7. Użytkownik wybiera formularz adopcyjny i wypełnia go danymi.
8. Użytkownik może zapisać formularz adopcyjny na swoim profilu. Zapisany może mieć tylko jeden formularz dla jednego zwierzęcia.
9. Użytkownik może wybrać interesujące go zwierze i złożyć na nie formularz.
10. Użytkownik otrzymuje wiadomość mailową z informacją o złożeniu formularza na wybrane zwierze.
11. Uzytkownik może wybrać date spotkania ze zwierzęciem.
12. Użytkownik może przeczytać szczegóły dotyczące zwierzęcia takie jak: wiek zwierzęcia, wielkość zwierzęcia, poziom aktywności zwierzęcia, dodatkowe informacje o zwierzęciu.
13. Użytkownik może obserwować status złożenia swojego formularza na swoim koncie.
14. Użytkownik może złożyć formularz tylko w przypadku założonego i potwierdzonego mailowo konta.
15. Użytkownik zostaje poinformowany mailowo o statusie możliwości adopcji.
16. Pozsotali użytkownicy zostają poinformowani mailowo o negatywnym statusie formularza adopcji, w przypadku gdy inny użytkownik zaadoptował już dane zwierze.
17. Użytkownik zostaje poinformowany mailowo o negatywnym rozpatrzeniu formularza przez pracownika schroniska.
18. Użytkownik może złożyć formularz na wolontariusza.
19. Użytkownik zostaje poinformowany mailowo o zostaniu wolontariuszem.


### Zmiany wprowadzone w wymaganiach

Lekkim wizualnym zmianom uległ projekt dostarczony przez grafika. 


### Działanie aplikacji


#### Menu Główne


##### Informacje


#### 


#### Przykładowa funkcjonalność aplikacji

<p align="center">
  <img src="link_do_gifa" alt="gif" />
</p>



### Zrealizowane dodatkowe zadania

Nasz zespół zrealizował także zadania dodatkowe, wykraczające poza zakres kursu

1. Utowrzony został szablon graficzny aplikacji w programie Figma.

2.

## Development aplikacji

Jeśli chcesz pomóc, w dalszym rozwoju aplikacji, z chęcią przyjmiemy Twoje Pull Requesty.

### Wykorzystywane technologie

W trakcie developmentu wykorzystujemy:

-   NodeJS
-   Swagger
-   Tsoa
-   Docker
-   Heroku
-   Json Web Token
-   ReactJS

Pozostałe narzędzia wspomagające pracę:

### Wykorzystane technologie

-   xxx
-   xxx
-   xxx
-   xxx
-   xxx
-   xxx

### Uruchomienie projektu

Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm install`
2. Wystartuj serwer developerski `npm run dev`

Aplikacja będzie dostępna pod adresem [localhost:8080/](http://localhost:8080)

Kod produkcyjny aplikacji umieszczamy w katalogu `dist`.

### Uruchomienie testów

Dodając swoje 5 groszy do naszej aplikacji, pamiętaj o pokryciu kodu testami.
Aby uruchomić testy aplikacji, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm install` (jeśli nie zrobiłeś już tego wcześniej).
2. Uruchom testy, wykonując komendę: `npm run test`. Testy z raportem pokrycia uruchomisz za pomocą: `npm run test:cov`.

Kod testów umieszczamy w katalogu `test`.

zmieni adres, z jakiego aplikacja będzie korzystać, aby łączyć się z SWApi. Domyślnie jest to zdefiniowane w pliku `.env` na wartość: `https://swapi.dev/api`.

### Organizacja pracy

Praca zespołu była organizowana przy użyciu narzędzi dostarczanych przez GitHub.
Zadania opisywaliśmy za pomocą GitHub Issues i dzieliśmy czas ich wykonania na tygodnie za pomocą GitHub Projects.
Każde z zadań było estymowane przez mentora, dzięki czemu staraliśmy się, aby liczba punktów przypadająca w danym tygodniu na każdą osobę w zespole była podobna.
Jeśli chcesz zaproponować, jakąś zmianę w aplikacji, utwórz nowy Issue, wzorując się na poprzednich.
