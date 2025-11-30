export function main(dtoIn) {
  const maleNames = ["Jan","Petr","Josef","Václav","Tomáš","Martin","Jiří","Michal","Lukáš","David","Ondřej","Roman","Marek","Daniel","Filip","Jaroslav","Stanislav","Viktor","Radek","Rudolf","Vratislav","Milan","Karel","Pavel","Lubomír","Aleš","Tom","Vladimír","Igor","Rostislav","Štěpán","Dominik","Radim","Richard","Emil","Bohumil","Miroslav","Eduard","Antonín","Patrik","Zdeněk","Jindřich","Břetislav","Libor","Vít","Dalibor","Oto","Vlastimil","Ctirad"];
  const femaleNames = ["Jana","Marie","Eva","Anna","Lucie","Petra","Alena","Ivana","Lenka","Markéta","Kristýna","Veronika","Monika","Simona","Hana","Barbora","Martina","Dana","Karolína","Jitka","Jiřina","Zuzana","Tereza","Gabriela","Nikola","Renata","Radka","Klára","Věra","Milada","Marcela","Helena","Soňa","Iveta","Blanka","Ludmila","Alžběta","Vendula","Dominika","Adéla","Naděžda","Svatava","Libuše","Milena","Kamila","Ela","Bohumila","Šárka","Růžena"];
  const surnames = ["Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec","Pokorný","Hruška","Král","Růžička","Fiala","Beneš","Urban","Kolář","Sedláček","Mach","Holub","Šimek","Kratochvíl","Bartoš","Vacek","Hájek","Kříž","Vondráček","Kopecký","Štěpánek","Mašek","Bláha","Čech","Švec","Koudelka","Štursa","Jelínek","Šafář","Pavlíček","Krejčí","Bureš","Králík","Tomášek","Volf","Štich","Zeman","Rybář","Sedlák","Kolman"];
  const workloads = [10,20,30,40];

  const dtoOut = [];
  const birthdatesSet = new Set();
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < dtoIn.count; i++) {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const name = gender === "male" 
      ? maleNames[Math.floor(Math.random() * maleNames.length)] 
      : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const workload = workloads[Math.floor(Math.random() * workloads.length)];

    // Generování unikátního birthdate
    let birthdate;
    let attempts = 0;
    do {
      const minYear = currentYear - dtoIn.age.max;
      const maxYear = currentYear - dtoIn.age.min;
      const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
      const month = Math.floor(Math.random() * 12);
      const day = Math.floor(Math.random() * 28) + 1;
      birthdate = new Date(Date.UTC(year, month, day, 0,0,0,0)).toISOString();
      attempts++;
      if(attempts>1000) break; // ochrana proti nekonečné smyčce
    } while(birthdatesSet.has(birthdate));
    birthdatesSet.add(birthdate);

    dtoOut.push({ gender, name, surname, workload, birthdate });
  }

  return dtoOut;
}

