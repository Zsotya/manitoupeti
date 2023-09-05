<template>
  <div class="paragraph-right">
    <div class="paragraph-section">
      <div class="left-side">
        <img src="@/assets/42.jpeg" alt="img" />
      </div>
      <div class="right-side">
        <h1>Title for this part</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A tempora
          molestiae id velit ipsa consequatur illum optio officiis, odio,
          dolores porro ex soluta deleniti sed eius. Vero, iure. Voluptatum,
          veritatis.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat quod
          cumque tempore dolor alias sapiente, quo, commodi illo possimus
          nostrum quia deleniti voluptatem nam officiis. Rerum delectus
          cupiditate tempora. Aliquam.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.paragraph-section {
  background-color: #e8e6e6;
  padding: 80px;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
}

.left-side {
  flex: 3;
  padding: 20px;
}

.left-side img {
  width: 843px;
  height: 896px;
  object-fit: cover;
}

.right-side {
  flex: 2;
  padding: 0px 0px 0px 75px;
}

.right-side p {
  font-size: 16px;
  line-height: 1.5;
  width: 40ch;
  padding: 16px 0px;
}
.right-side h1 {
  font-size: 30px;
  display: flex;
}
</style>
