<template>
  <section>
    <div class="career-cards">
      <CareerComp :jobs="jobs" />
    </div>
  </section>
</template>

<script setup>
import CareerComp from "@/components/CareerComponents/CareerComp.vue";

const jobs = [
  {
    id: 1,
    jobName_hu: "Emelőgépkezelő",
    jobName_en: "Crane Operator",
    jobDescription_hu:
      "Szeretnénk felvenni minél több emelőgépkezelőt, mindenképpen elvárás az OKJ képzés megléte. Részletek a 'Jelentkezz most!' gombra kattintás után elérhetőek.",
    jobDescription_en:
      "We would like to apply more and more machine operators, you must have OKJ. Details at 'Apply now!' button go check",
    jobTime_hu: "Teljes munkaidő",
    jobTime_en: "Full-time",
  },
  {
    id: 2,
    jobName_hu: "Földmunkagépkezelő",
    jobName_en: "Heavy Equipment Operator",
    jobDescription_hu:
      "Szeretnénk felvenni minél több földmunkagépkezelőt, mindenképpen elvárás az OKJ képzés megléte. Részletek a 'Jelentkezz most!' gombra kattintás után elérhetőek.",
    jobDescription_en:
      "We would like to apply more and more machine operators, you must have OKJ. Details at 'Apply now!' button go check",
    jobTime_hu: "Full-time",
  },
  {
    id: 3,
    jobName_hu: "Fuvarszervező",
    jobName_en: "Logistics Coordinator",
    jobDescription_hu:
      "A fontos logisztikai feladatok elvégzésére szeretnénk új logisztikust/fuvarszervező munkatársat a köreinkbe. Amennyiben rendelkezik logisztikai végzettséggel és érdekelné a munkakör, kattintson a 'Jelentkezz most!' gombra.",
    jobDescription_en:
      "We are looking to hire a new Logistics Coordinator to handle important logistics tasks within our team. If you have a background in logistics and are interested in the position, click the 'Apply Now!' button.",
    jobTime_hu: "Teljes munkaidő",
    jobTime_en: "Full-time",
  },
  {
    id: 4,
    jobName_hu: "Könyvelő",
    jobName_en: "Accountant",
    jobDescription_hu:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobDescription_en:
      "LoremENEN ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Click apply now for details",
    jobTime_hu: "Részmunkaidő",
    jobTime_en: "Part-time",
  },
  {
    id: 5,
    jobName_hu: "Vevői kapcsolattartó",
    jobName_en: "Customer Relationship Manager",
    jobDescription_hu:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobDescription_en:
      "LoreENENEN ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Click apply now for details",
    jobTime_hu: "Teljes munkaidő",
    jobTime_en: "Full-time",
  },
  {
    id: 6,
    jobName_hu: "Gépszerelő",
    jobName_en: "Mechanic",
    jobDescription_hu:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobDescription_en:
      "LoremENENEN ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. click apply now for details.",
    jobTime_hu: "Részmunkaidő",
    jobTime_en: "Part-time",
  },
  {
    id: 7,
    jobName_hu: "Jogász",
    jobName_en: "Lawyer",
    jobDescription_hu:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobDescription_en:
      "LoremENEnEnn ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. click apply details!",
    jobTime_hu: "Részmunkaidő",
    jobTime_en: "Part-time",
  },
  {
    id: 8,
    jobName_hu: "Katona",
    jobName_en: "Soldier",
    jobDescription_hu:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért. aaaaaaaaaaaaaaaaaa ",
    jobDescription_en:
      "LoremENENEN ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Click apply now!aaaaaaaaa ",
    jobTime_hu: "Alkalmi munka",
    jobTime_en: "Occasional work",
  },
];
</script>
