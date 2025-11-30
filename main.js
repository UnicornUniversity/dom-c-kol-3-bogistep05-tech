export function main(dtoIn) {
    const maleNames = ["Jan","Petr","Josef","Václav","Tomáš","Martin","Jiří","Michal","Lukáš","David","Ondřej","Roman","Marek","Daniel","Filip","Jaroslav","Stanislav","Viktor","Radek","Rudolf","Vratislav","Milan","Karel","Pavel","Lubomír","Aleš","Tom","Vladimír","Igor","Rostislav","Štěpán","Dominik","Radim","Richard","Emil","Bohumil","Miroslav","Eduard","Antonín","Patrik","Zdeněk","Jindřich","Břetislav","Libor","Vít","Dalibor","Oto","Vlastimil","Ctirad"];
    const femaleNames = ["Jana","Marie","Eva","Anna","Lucie","Petra","Alena","Ivana","Lenka","Markéta","Kristýna","Veronika","Monika","Simona","Hana","Barbora","Martina","Dana","Karolína","Jitka","Jiřina","Zuzana","Tereza","Gabriela","Nikola","Renata","Radka","Klára","Věra","Milada","Marcela","Helena","Soňa","Iveta","Blanka","Ludmila","Alžběta","Vendula","Dominika","Adéla","Naděžda","Svatava","Libuše","Milena","Kamila","Ela","Bohumila","Šárka","Růžena"];
    const surnames = ["Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec","Pokorný","Hruška","Král","Růžička","Fiala","Beneš","Urban","Kolář","Sedláček","Mach","Holub","Šimek","Kratochvíl","Bartoš","Vacek","Hájek","Kříž","Vondráček","Kopecký","Štěpánek","Mašek","Bláha","Čech","Švec","Koudelka","Štursa","Jelínek","Šafář","Pavlíček","Krejčí","Bureš","Králík","Tomášek","Volf","Štich","Zeman","Rybář","Sedlák","Kolman"];
    const workloads = [10,20,30,40];

    const dtoOut = [];
    const birthdatesSet = new Set();
    const now = Date.now();
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;

    function getRandomGender() {
        return Math.random() < 0.5 ? "male" : "female";
    }

    function getRandomName(gender) {
        return gender === "male"
            ? maleNames[Math.floor(Math.random() * maleNames.length)]
            : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    }

    function getRandomSurname() {
        return surnames[Math.floor(Math.random() * surnames.length)];
    }

    function getRandomWorkload() {
        return workloads[Math.floor(Math.random() * workloads.length)];
    }

    function getRandomBirthdate(minAge, maxAge) {
        const ageMinMs = minAge * msPerYear;
        const ageMaxMs = maxAge * msPerYear;
        let birthMs, birthdate;
        let attempts = 0;
        do {
            birthMs = now - ageMinMs - Math.random() * (ageMaxMs - ageMinMs);
            birthdate = new Date(birthMs);
            birthdate = new Date(Date.UTC(
                birthdate.getUTCFullYear(),
                birthdate.getUTCMonth(),
                birthdate.getUTCDate(),
                0,0,0,0
            )).toISOString();
            attempts++;
            if(attempts>1000) break; // ochrana proti nekonečné smyčce
        } while(birthdatesSet.has(birthdate));
        birthdatesSet.add(birthdate);
        return birthdate;
    }

    for (let i = 0; i < dtoIn.count; i++) {
        const gender = getRandomGender();
        const name = getRandomName(gender);
        const surname = getRandomSurname();
        const workload = getRandomWorkload();
        const birthdate = getRandomBirthdate(dtoIn.age.min, dtoIn.age.max);

        dtoOut.push({ gender, name, surname, workload, birthdate });
    }

    return dtoOut;
}
