<template>
    <div class="paragraph-section">
        <div class="text-part">
            <div class="paragraph-title">{{ paragraph.title }}</div>
            <div class="paragraph-content">{{ paragraph.content }}</div>
        </div>
        <div class="image-container">
            <img :src="paragraph.imageSrc" alt="image">
        </div>
    </div>
</template>

<script setup>

const { paragraph } = defineProps(["paragraph"]);

</script>

<style scoped>

.paragraph-section {
    background-color: #e8e6e6;
    padding-bottom: 50px;
    display: flex;
}

.paragraph-section .image-container {
    justify-content: flex-end;
}

.text-part {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1.6;
    padding-left: 140px;
}

.paragraph-title {
    width: 26ch;
    font-size: 30px;
    margin-bottom: 16px;
    font-weight: bolder;
}

.paragraph-content {
    width: 46ch;
    line-height: 1.5;
    font-size: 16px;
}

.image-container {
    display: flex;
    margin-right: 140px;
}

.image-container img {
    width: 840px;
    height: 890px;
    object-fit: cover;
}

</style>