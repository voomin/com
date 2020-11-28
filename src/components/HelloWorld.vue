<template>
    <div class="hello">
        test

        <div class="test">
            hi
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    * {
        color: green;
    }

    .hello {
        .test {
            background: none;
            color: red;
        }
    }
</style>
