import Animal from '../Animal';
import { DeepPartial } from 'typeorm';
import * as faker from 'faker';
//import { AnimalSize, AnimalActiveLevel } from '../AnimalAdditionalInfo';
// import Specie from '../Specie';

// enum Specie {
//     DOG = 'dog',
//     CAT = 'cat',
// }

export const seedAnimals = (amount: number): DeepPartial<Animal>[] => {
    const animals: DeepPartial<Animal>[] = [
        //  Psy -----------------------------------------------
        {
            name: 'Mateusz',
            age: 10,
            description:
                'Nie jestem już młodym psiakiem, ale jeszcze nie staruszkiem. Jestem jeszcze całkiem energiczny, chętnie chodzę na spacery i nawet trochę dłuższe wycieczki. W domu jestem bardzo spokojny, leżę w swoim posłanku, czasami przyjdę po porcję pieszczot. Początkowo jestem nieśmiały i obojętny, ale już po chwili otwieram się i szukam kontaktu z człowiekiem. Spędziłem w schronisku 5 długich lat, ale nie daję tego po sobie poznać. Nie straciłem nadziei. Wierzę, że będę kiedyś miał swojego ukochanego człowieka. Obecnie przebywam w domu tymczasowym na warszawskim Wilanowie. Tam można się ze mną spotkać. W domu jestem prawdziwym ideałem - nie brudzę, nie niszczę. Dzielnie zostaję sam nawet na 8-9 godzin.',
            readyForAdoption: true,
            specie: { id: 1 },
            thumbnail: { id: 1 },
            additionalInfo: { id: 1 },
        },
        {
            name: 'Tomek',
            age: 5,
            description:
                'Cześć, jestem Tomek. Do domu tymczasowego przyjechałem ze schroniska, w którym kompletnie nie mogłem się odnaleźć. Ciągły stres powodował u mnie pogorszenie nastroju i zdrowia. Od niedawna mieszkam w bloku w Warszawie i od razu czuję się dużo lepiej! Ciągle jestem uśmiechnięty i mam merdający ogon. Jestem niskopodłogowym, sympatycznym kundelkiem. Ważę ok 10 kg. Natychmiast odnalazłem się w przestrzeni miejskiej - schody, winda czy różne dźwięki dochodzące z mieszkania są OK. Chciałbyś mnie zabrać na wycieczkę? Nie ma sprawy! W samochodzie nawet nie zauważysz mojej obecności, taki jestem grzeczny. Lubię poznawać nowych ludzi i psich kumpli, ale wszyscy musimy się szanować, żeby dobrze nam się spędzało czas. Kiedy się zestresuję nagłym dotykiem mogę złapać za rękę. Dlatego wolałbym nie mieszkać z dziećmi. Jestem domatorem i leniuszkiem, więc nie pobiegasz ze mną na spacerze.',
            readyForAdoption: true,
            specie: { id: 1 },
            thumbnail: { id: 2 },
            additionalInfo: { id: 2 },
        },
        {
            name: 'Pestka',
            age: 2,
            description:
                'Hej, jestem Pestka i mówią, że jestem psem lękowym, ale sama nie wiem. Faktycznie trochę się boję, ale raczej na zewnątrz. W domu dobrze się czuję . Stopniowo staram się pokonywać swoje lęki. Nieźle mi idzie. Na pewno pomaga mi psio-kocie towarzystwo i chętnie z takim towarzystwem zamieszkam. Nieźle radzę sobie na smyczy. Załatwiam się na dworze. W domu nie niszczę i nie rozrabiam. Pokochasz mnie? Dasz mi szansę?',
            readyForAdoption: true,
            specie: { id: 1 },
            thumbnail: { id: 3 },
            additionalInfo: { id: 3 },
        },
        {
            name: 'Zuzia',
            age: 8,
            description:
                '​Jestem Zuzia, mam około 9 lat. Poszukuję spokojnego, zrównoważonego człowieka, który będzie mógł ze mną spędzać dużo czasu. Ideałem byłaby osoba pracująca w domu. Dlaczego? Ano dlatego, że ja bardzo źle znoszę samotność. Tylko przy człowieku czuję się bezpiecznie. Poza tym nie mam żadnych problemów. Jestem spokojna, opanowana, grzeczna - całkowicie pozbawiona agresji. Nie lubię konfliktów, świetnie dogaduję się z innymi psami i suczkami. Z kotami słabiej a nawet bardzo źle. Po prostu ich nie znoszę i jak tylko widzę muszę pogonić. Poza tym swojego człowieka pokocham całym sercem. Na zawsze <3',
            readyForAdoption: true,
            specie: { id: 1 },
            thumbnail: { id: 4 },
            additionalInfo: { id: 4 },
        },
        {
            name: 'Lucky',
            age: 4,
            description:
                '​​Jestem Lucky. Jestem psem w średnim wieku i ważę 20 kg. Jestem mistrzem skakania. Bardzo lubię biegać i szaleć w ogródku, ale nie przepadam za spacerami. Jestem ostrożny w stosunku do ludzi, dopiero uczę się zaufania do nich. W domu tymczasowym mieszkam z dziećmi, ale traktuję je z rezerwą. Nie przyłączam się, kiedy widzę ich zabawy. Nie lubię się spoufalać. Jestem dosyć lękliwy, najbardziej boję się burzy i wystrzałów.  Poszukuję opiekuna, który będzie pracował z domu i nie będzie mnie zostawiał na długo samego oraz pomoże mi nabrać pewności siebie. Koniecznie dom na wsi lub na odludziu.',
            specie: { id: 1 },
            thumbnail: { id: 5 },
            additionalInfo: { id: 5 },
        },
        //  Koty -----------------------------------------------
        {
            name: 'Ania',
            age: 19,
            description:
                '​​Dzień dobry, jestem Ania i mam złamane serduszko. Mój opiekun zmarł, a ja razem z moją koleżanką spędziłyśmy 2 lata w pustym mieszkaniu. Bałam się i byłam bardzo samotna. Na szczęście miałam koleżankę. Gdyby nie ona, nie wiem jak bym dała radę. Teraz, w domu tymczasowym, powoli odzyskuję zaufanie do człowieka. Podchodzę do nóg, ocieram się, proszę dyskretnie o głaski. Jestem bardzo łagodna. Szukam człowieka, który znów mnie pokocha. Chętnie zamieszkam z drugim kotem.',
            specie: { id: 2 },
            thumbnail: { id: 6 },
            additionalInfo: { id: 6 },
        },
        {
            name: 'Werka',
            age: 4,
            description:
                'Cześć, jestem Werka i mam białaczkę. Podobno dlatego nie mogę mieszkać z innymi kotami. Za to z człowiekiem mogę mieszkać i bardzo bym tego chciał, bo człowieka lubię. Lubię też głaskanie, wyglądanie przez okno i dobre jedzenie. Lubiłem też biegać po podwórku, ale podobno już nie mogę bo mam tą białaczkę. No więc czekam na kogoś kto mnie pokocha i da super dom z ładnym widokiem i mnóstwem rąk do głaskania. Jestem z Łodzi',
            specie: { id: 2 },
            thumbnail: { id: 7 },
            additionalInfo: { id: 7 },
        },
        {
            name: 'Mateusz',
            age: 15,
            description:
                'Hej, jestem Mateusz i szukam domu stałego niewychodzącego, który pokaże mi, że człowiek może być dobry. Na razie z dystansem podchodzę do ludzi, ale to tylko kwestia czasu, miłości i cierpliwości, żebym stał się rozmruczanym przytulakiem. Urodziłem się na ulicy, ale na szczęście w domu tymczasowym zapominam wszystko co złe. Szybko uczę się dobrych manier i domowego życia. Daj mi szansę, a będę cudownym przyjacielem na lata!',
            specie: { id: 2 },
            thumbnail: { id: 8 },
            additionalInfo: { id: 8 },
        },
        {
            name: 'Mateusz',
            age: 7,
            description:
                'Hejka, jestem Mateusz. Jestem najbardziej żywiołowy i proludzki z całego rodzeństwa. Uwielbiam się przytulać i być głaskany. Moją ulubioną zabawką jest piszcząca myszka, którą często noszę w pyszczku. Szukam domu z jedną z moich sióstr - Dianą lub Holly. Mogę też zamieszkać z innym młodym i fajnym kotkiem. Szukam bezpiecznego domu w Warszawie lub najbliższych okolicach. Domek musi mieć zabezpieczone okna/balkon.',
            specie: { id: 2 },
            thumbnail: { id: 8 },
            additionalInfo: { id: 8 },
        },
        {
            name: 'Dżoker',
            age: 1,
            description:
                'Jestem wesołym i pełnym energii urwisem. Mam na imię Dżoker i właśnie skończyłem 2 miesiące. Razem ze swoim domem rodzeństwem mieszkam obecnie w domu tymczasowym i bardzo chciałbym znaleźć dom prawdziwy, taki już do końca życia. Nic mi nie dolega, jestem młody i dziarski, jak każdego malucha- rozpiera mnie energia. Może chciałbyś mnie pokochać? Czekam na Ciebie w Trójmieście.',
            specie: { id: 2 },
            thumbnail: { id: 9 },
            additionalInfo: { id: 9 },
        },
        {
            name: 'Dżoker',
            age: 3,
            description:
                'Hejka, jestem Gryzia! W małym ciele duży duch. Z rodzeństwa jestem najmniejsza, ale najodważniejsza :) Nie straszny mi człowiek, chętnie daję się głaskać i nosić na rękach. Jak człowiek śpi to nawet czasami się wkradam do niego pod kołdrę. Mimo małego ciałka mam duży apetyt i nie wybrzydzam. Świetnie się dogaduję z małymi kotami, jak i z kocimi seniorami, choć muszę przyznać, że te ostatnie są leniwe i nieskore do zabawy. A ja bardzo lubię się bawić. Oczywiście drzemka w ciągu dnia jak najbardziej wskazana, najlepiej z moim człowiekiem. Chciałabym, żeby mój Pańcio miał dla mnie czas, dbał o mnie, karmił, no i pozwalał mi spać w łożeczku :) Jeżeli szukasz wiernej kociej towarzyszki to właśnie znalazłeś. Ale jak mieszkać to pamiętaj - tylko w Trójmieście. Do zobaczyska, Gryzia',
            specie: { id: 2 },
            thumbnail: { id: 10 },
            additionalInfo: { id: 10 },
        },
    ];

    for (let i = 10; i < amount; i++) {
        // const randomSpecie = faker.random.arrayElement(Object.values(Specie));
        //const randomActiveLevel = faker.random.arrayElement(Object.values(AnimalActiveLevel));
        // const randomSpecie = faker.random.arrayElement(['cat', 'dog']);

        animals.push({
            ...animals,
            name: faker.name.firstName(),
            age: faker.random.number({
                min: 0,
                max: 15,
                precision: 1,
            }),
            description: faker.lorem.words(20),
            readyForAdoption: faker.random.boolean(),
            additionalInfo: { id: i + 1 },
            thumbnail: { id: i + 1 },
            specie: { id: (i % 2) + 1 },
        });
    }
    return animals;
};
