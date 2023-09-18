<template>
  <div>
    <div class="career-cards">
      <CareerComp :jobs="jobs" />
    </div>
  </div>
</template>

<script setup>
import CareerComp from "@/components/CareerComponents/CareerComp.vue";

const jobs = [
  {
    id: 1,
    jobName: "Emelőgépkezelő",
    jobDescription:
      "Szeretnénk felvenni minél több emelőgépkezelőt, mindenképpen elvárás az OKJ képzés megléte. Részletek a 'Jelentkezz most!' gombra kattintás után elérhetőek.",
    jobTime: "Teljes munkaidő",
  },
  {
    id: 2,
    jobName: "Földmunkagépkezelő",
    jobDescription:
      "Szeretnénk felvenni minél több földmunkagépkezelőt, mindenképpen elvárás az OKJ képzés megléte. Részletek a 'Jelentkezz most!' gombra kattintás után elérhetőek.",
    jobTime: "Teljes munkaidő",
  },
  {
    id: 3,
    jobName: "Fuvarszervező",
    jobDescription:
      "A fontos logisztikai feladatok elvégzésére szeretnénk új logisztikust/fuvarszervező munkatársat a köreinkbe. Amennyiben rendelkezik logisztikai végzettséggel és érdekelné a munkakör, kattintson a 'Jelentkezz most!' gombra.",
    jobTime: "Teljes munkaidő",
  },
  {
    id: 4,
    jobName: "Könyvelő",
    jobDescription:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobTime: "Részmunkaidő",
  },
  {
    id: 5,
    jobName: "Vevői kapcsolattartó",
    jobDescription:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobTime: "Teljes munkaidő",
  },
  {
    id: 6,
    jobName: "Gépszerelő",
    jobDescription:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobTime: "Részmunkaidő",
  },
  {
    id: 7,
    jobName: "Jogász",
    jobDescription:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.",
    jobTime: "Részmunkaidő",
  },
  {
    id: 8,
    jobName: "Katona",
    jobDescription:
      "Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Lorem ipsum aszkala baszkala csasztala bum. Prifferium tolerium mandatoru askelu kaotorikum. Kattints a 'Jelentkezz most!' gombra a részletekért.aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa ",
    jobTime: "Alkalmi munka",
  },
];
</script>
