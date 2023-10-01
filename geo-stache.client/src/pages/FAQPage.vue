<template>
    <div class="container">
        <div class="col-md-9 col-12 px-1 txt-DrkGreen fnt-Cabin">
            <h2>Frequently Asked Questions (FAQ)</h2>
            <ul>
                <li>
                    <strong>What is Geo-Stache?</strong>
                    <p>
                        Geo-Stache is an innovative geo-staching experience that combines technology, open-source
                        collaboration,
                        and exploration. It allows users to engage in treasure hunting activities without the need for
                        physical
                        containers, making it accessible to a broader audience.
                    </p>
                </li>
                <li>
                    <strong>How do I get started with Geo-Stache?</strong>
                    <p>
                        To get started with Geo-Stache, simply create an account on our platform. Once registered, you can
                        use
                        the
                        Geo-Stache app or website to explore geo-staches, participate in challenges, and collaborate with
                        other
                        enthusiasts.
                    </p>
                </li>
                <li>
                    <strong>Is Geo-Stache open source?</strong>
                    <p>
                        Yes, Geo-Stache is entirely open source. We believe in fostering a global community of geo-stachers
                        who
                        can
                        contribute to and enhance the Geo-Stache experience. You can access the source code, participate in
                        development,
                        and
                        even create your own geo-staching challenges.
                    </p>
                </li>
                <li>
                    <strong>Do I need any special equipment to play Geo-Stache?</strong>
                    <p>
                        Geo-Stache can be played with a smartphone or GPS-enabled device, as well as a stable internet
                        connection. No
                        special equipment or physical caches are required, making it accessible to virtually anyone.
                    </p>
                </li>
                <li>
                    <strong>How do I find geo-staches on Geo-Stache?</strong>
                    <p>
                        Using the Geo-Stache mobile friendly website, you can browse the map to discover geo-staches near
                        your
                        location.
                        Simply select a geo-stache, navigate to its coordinates, and engage in the challenge or adventure it
                        offers.
                    </p>
                </li>
                <li>
                    <strong>Can I create my own geo-staches on Geo-Stache?</strong>
                    <p>
                        Absolutely! Geo-Stache encourages users to create their own geo-staches and challenges. You can
                        design
                        unique
                        adventures, set coordinates, and invite others to participate. It's a platform for geo-staching
                        enthusiasts to
                        unleash their creativity.
                    </p>
                </li>
                <li>
                    <strong>Is Geo-Stache suitable for beginners?</strong>
                    <p>
                        Yes, Geo-Stache is suitable for geo-staching beginners and experienced enthusiasts alike. The
                        digital
                        nature
                        of
                        the platform simplifies the experience, making it user-friendly for those new to geo-staching while
                        offering
                        exciting challenges for veterans.
                    </p>
                </li>
                <li>
                    <strong>Are there any costs associated with using Geo-Stache?</strong>
                    <p>
                        Geo-Stache is committed to being accessible to all. The Geo-Stache experience is designed to be
                        inclusive and
                        budget-friendly.
                    </p>
                </li>
                <li>
                    <strong>How do I connect with other geo-stachers on Geo-Stache?</strong>
                    <p>
                        Geo-Stache provides social features that allow you to connect with other geo-stachers. You can join
                        communities,
                        share your adventures, and collaborate on challenges, fostering a sense of camaraderie among users.
                    </p>
                </li>
                <li>
                    <strong>Is Geo-Stache available on mobile devices?</strong>
                    <p>
                        Yes, Geo-Stache offers a mobile-friendly web app.
                    </p>
                </li>
            </ul>

            <router-link :to="{ name: 'Why' }">
                <div class="fs-3">Learn more about Geo-Stache</div>
            </router-link>
        </div>
    </div>
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
