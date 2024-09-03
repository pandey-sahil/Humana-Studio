function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  var locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  function navAnimation() {
    let lastScrollY = 0;

    locoScroll.on("scroll", (args) => {
      let scrollY = args.scroll.y;

      if (scrollY > lastScrollY) {
        // Scrolling down
        gsap.to(".nav", {
          yPercent: -100,
          duration: 1,
          ease: "power2.out",
        });
        // gsap.to(".logo", {
        //   opacity: 1,
        //   duration: 1,
        //   ease: "power2.out",
        // });
      } else {
        // Scrolling up
        gsap.to(".nav", {
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
        });
      }

      lastScrollY = scrollY;
    });
  };
  navAnimation();

  function page6ResizeAnime() {
    const wrappers = document.querySelectorAll('#page6ColWrapper');

    wrappers.forEach(wrapper => {
      // Toggle height on click with GSAP
      wrapper.addEventListener('click', function () {
        if (this.classList.contains('h-[10.313rem]')) {
          gsap.to(this, {
            height: 'auto',
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              this.classList.remove('h-[10.313rem]');
              locoScroll.update(); // Update scroll after the animation completes
            }
          });
        } else {
          gsap.to(this, {
            height: '10.313rem',
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              this.classList.add('h-[10.313rem]');
              locoScroll.update(); // Update scroll after the animation completes
            }
          });
        }


      });

      // wrapper.addEventListener('mouseenter', function () {
      //   const imgWrapper = this.querySelector('.page6ImgWrapper');
      //   if (imgWrapper) {
      //     gsap.to(imgWrapper, {
      //       y: -20, // Move up by 20px or adjust as needed
      //       duration: 0.3,
      //       // ease: "power2.inOut"
      //     });
      //   }
      // });

      // wrapper.addEventListener('mouseleave', function () {
      //   const imgWrapper = this.querySelector('.page6ImgWrapper');
      //   if (imgWrapper) {
      //     gsap.to(imgWrapper, {
      //       y: 0,
      //       duration: 0.3,
      //       // ease: "power2.inOut"
      //     });
      //   }
      // });

      // Update locoScroll after the height transition ends
      wrapper.addEventListener('transitionend', function () {
        locoScroll.update();
      });

    });
  }

  // Initialize the animation function
  page6ResizeAnime();

  // Refresh ScrollTrigger and update Locomotive Scroll
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  // Initial update
  ScrollTrigger.refresh();
}
loco();

function page1() {
  const months = [
    "January", "February",
    "March", "April", "May",
    "June", "July", "August",
    "September", "October",
    "November", "December"
  ];

  var timeDiv = document.querySelector('.time')
  var dateDiv = document.querySelector('.date')
  var time = new Date();
  var currentTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  var currentDay = time.toLocaleString('en-us', { weekday: 'long' })
  var currentDate = currentDay + '<br>' + months[time.getMonth()] + ' ' + time.getDate() + ', ' + time.getFullYear()

  timeDiv.innerText += ` ` + currentTime;
  dateDiv.innerHTML += ` ` + currentDate
}
page1();


function page3Animation() {
  gsap.to("#page3Wrapper", {
    transform: "translateX(-102%)",
    scrollTrigger: {
      start: "top 0%",
      end: "top -100%",
      trigger: ".page3",
      scroller: "main",
      // markers:true,
      pin: true,
      scrub: 1
    }
  });
};
page3Animation();

function page4Animation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".countdownDivs",
      start: "top 70%",
      scroller: 'main',
      end: "top 0%",
      markers: true,
      onEnter: () => {
        gsap.fromTo(".countdown",
          { y: 200, opacity: 0, stagger: 1 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {

              const yearsCount = Math.floor(gsap.getProperty(".yearsCount", "innerText"));
              const projCount = Math.floor(gsap.getProperty(".projectsCount", "innerText"));
              const countryCount = Math.floor(gsap.getProperty(".countryCount", "innerText"));
              const treeCount = Math.floor(gsap.getProperty(".treeCount", "innerText"));
              document.querySelector(".yearsCount").innerText = yearsCount;
              document.querySelector(".projectsCount").innerText = projCount;
              document.querySelector(".countryCount").innerText = countryCount;
              document.querySelector(".treeCount").innerText = treeCount;
            }
          });
      }
    },

  })

  // Counter animation
  tl.to(".projectsCount", {
    innerText: 161,
    snap: { innerText: 1 },
    duration: 1, // Duration of the counting
    ease: "none" // Linear counting
  }, 'a');
  tl.to(".yearsCount", {
    innerText: 5,
    snap: { innerText: 1 },
    duration: 1, // Duration of the counting
    ease: "none" // Linear counting
  }, 'a');
  tl.to(".countryCount", {
    innerText: 23,
    snap: { innerText: 1 },
    duration: 1, // Duration of the counting
    ease: "none" // Linear counting
  }, 'a');
  tl.to(".treeCount", {
    innerText: 28,
    snap: { innerText: 1 },
    duration: 1, // Duration of the counting
    ease: "none" // Linear counting
  }, 'a');

}
page4Animation();


function page7Animation (){
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 15,
    freeMode: true,
  });
};

page7Animation();