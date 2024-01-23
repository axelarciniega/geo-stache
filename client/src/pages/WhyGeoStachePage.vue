<template>
    <section class="container">

        <div class="p-2 fs-5">
            <div class="rounded ps-2 py-1 pe-1 m-3 table-card">
                <div>
                    <strong class="text-center">Why Geo-Stache?</strong>
                </div>

                <p>We're excited to introduce Geo-Stache, a groundbreaking open-source geocache activity that takes the
                    thrill
                    of
                    treasure hunting to new heights. With Geo-Stache, we've combined the principles of geocaching with a
                    fresh
                    and
                    communal approach. By embracing open source, we're making it easy for anyone to participate and
                    contribute
                    to
                    this exciting adventure. Geo-Stache is more than just a treasure hunt; it's a platform for enthusiasts
                    to
                    collaborate, share, and create their own geocaching experiences. Join us in this exciting journey of
                    exploration, where the thrill of discovery meets the power of open collaboration. Whether you're an
                    experienced
                    cacher or a newcomer to the world of geocaching, Geo-Stache welcomes you to embark on a global treasure
                    hunt
                    like never before.</p>
                <p>
                    Innovating the geocaching experience, we've removed the traditional necessity of physical containers, or
                    caches,
                    in Geo-Stache. By harnessing the capabilities of modern technology and embracing a digital-first
                    approach,
                    we've
                    made it possible for geocachers to participate without the need for physical items. With Geo-Stache, the
                    world
                    becomes your canvas, and geocaches are represented virtually, allowing for endless possibilities and
                    challenges.
                    This evolution not only simplifies the logistics of the game but also opens up opportunities for
                    creativity
                    and
                    engagement like never before. Now, you can explore and interact with geocaches seamlessly in the digital
                    realm,
                    fostering a dynamic and accessible geocaching community for all. Join us in redefining the future of
                    treasure
                    hunting with Geo-Stache, where the adventure is boundless, and the cache is no longer confined to the
                    physical
                    world.
                </p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>



<style lang="scss" scoped>
// .profile-pic {

//   border-radius: 50%;
//   width: 100%;
//   object-fit: cover;
//   object-position: center;
// }

.profile-pic {
    // border-top-left-radius: 15px;
    // border-bottom-right-radius: 15px;
    border-radius: 50%;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
    // elevation-2 settings

}

.table-card {
    backdrop-filter: blur(20px);
    // background-color: #e3d4bf;
    border-radius: 5px;

    width: 100%;
    box-shadow: 0 1px 1px -1px rgba(133, 133, 133, 0.85),
        0 1px 8px 0 rgba(133, 133, 133, 0.79),
        0 1px 10px 0 rgba(133, 133, 133, 0.79);
}
</style>
