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


function page2Animation() {

  var line = document.querySelector('.page2Line .innerLine');
  var page2PTags = document.querySelectorAll('.page2 p')
  var page2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      start: "top 70%",
      end: "top 50%",
      scroller: "main",
      markers: true,
      // scrub: true
    }
  })

  page2Tl.to(line, {
    width: "100%",
    duration: 2,
    ease: "power2.inOut",

  }, 'aa');

  page2PTags.forEach((p) => {
    page2Tl.from(p, {
      y: Math.random() * 100 + 200, // Adjust y value to randomize more
      duration: Math.random() * 1 + 1, // Random duration between 1 and 2 seconds
      stagger: 1,
      ease: "power2.inOut",
    }, 'aa');
  });
};
page2Animation();

function page3Animation() {

  var line = document.querySelector('#page3UpperLine');
  var page3Boxes = document.querySelectorAll('.boxes')
  var page3Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page3",
      start: "top 70%",
      end: "top 50%",
      scroller: "main",
      markers: true,
      // scrub: true
    }
  })

  page3Tl.from(line, {
    x: -2000,
    duration: 1.8,
    ease: "power2.inOut",

  }, 'aa');

  page3Boxes.forEach((box) => {
    var h2Tags = box.querySelectorAll('h2');

    page3Tl.from(box, {
      opacity: 0,
      x: Math.random() * 100 + 1500, // Adjust y value to randomize more
      duration: Math.random() * 1 + 1, // Random duration between 1 and 2 seconds
      stagger: 0.5,
      ease: "power2.inOut",
    }, 'aa');

    gsap.set(h2Tags, {
      y: '-2.3rem'
    })
    box.addEventListener('mouseenter', function () {
      gsap.to(h2Tags, {
        y: 0,
      })
    });
    box.addEventListener('mouseleave', function () {

      gsap.to(h2Tags, {
        y: '-2.3rem'
      })
    });
  });

  page3Tl.set('#page3Wrapper', {
    x: "0%",
  })
    .to("#page3Wrapper", {
      // transform: "translateX(-102%)",
      x: '-102%',
      scrollTrigger: {
        start: "top 0%",
        end: "top -100%",
        trigger: ".page3",
        scroller: "main",
        // markers:true,
        pin: true,
        scrub: 1
      }
    })
  gsap.to(".page3LowerLine .innerLine", {
    width: "100%",
    delay: 1,
    scrollTrigger: {
      trigger: ".page4",
      start: "top 70%",
      scroller: 'main',
      end: "top 0%",
      markers: true,
    }
  })

};
page3Animation();

function page4Animation() {
  var page4Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page4",
      start: "top 70%",
      scroller: 'main',
      end: "top 0%",
      markers: true,

    },

  })

  page4Tl.to(".countdown", {
    duration:2,
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
  }, 'a');
  page4Tl.from('.page4Button , .page4Text p', {
    y: Math.random() * 100 + 300, // Adjust y value to randomize more
    duration: Math.random() * 1 + 1, // Random duration between 1 and 2 seconds
    stagger: 1,
    ease: "power2.inOut",
  }, 'a');
  // Counter animation
  page4Tl.to(".projectsCount", {
    innerText: 161,
    snap: { innerText: 1 },
    duration: 1.5, // Duration of the counting
    delay:1,
    ease: "none" // Linear counting
  }, 'a');
  page4Tl.to(".yearsCount", {
    innerText: 5,
    snap: { innerText: 1 },
    duration: 1.75, // Duration of the counting
    delay:1,
    ease: "none" // Linear counting
  }, 'a');
  page4Tl.to(".countryCount", {
    innerText: 23,
    snap: { innerText: 1 },
    duration: 2, // Duration of the counting
    delay:1,
    ease: "none" // Linear counting
  }, 'a');
  page4Tl.to(".treeCount", {
    innerText: 28,
    snap: { innerText: 1 },
    duration: 2.25, // Duration of the counting
    delay:1,
    ease: "none" // Linear counting
  }, 'a');
  gsap.to(".page4BottomLine .innerLine", {
    width: "100%",
    delay: 1,
    scrollTrigger: {
      trigger: ".page4BottomLine",
      start: "top 70%",
      scroller: 'main',
      end: "top 0%",
      markers: true,
    }
  })
}
page4Animation();

function page5Animation() {
  var page5PTags = document.querySelectorAll('.page5 p')
  var page5Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page4BottomLine",
      start: "top 70%",
      end: "top 50%",
      scroller: "main",
      markers: true,
      // scrub: true
    }
  })



  page5PTags.forEach((p) => {
    page5Tl.from(p, {
      y:200, // Adjust y value to randomize more
      duration: .5, // Random duration between 1 and 2 seconds
      stagger: 1,
      ease: "power2.inOut",
    }, 'aa');
  });

  page5Tl.from('.page5Button', {
    y:200, // Adjust y value to randomize more
    duration: Math.random() * 1 + 1, // Random duration between 1 and 2 seconds
    stagger: 1,
    ease: "power2.inOut",
  }, 'aa');

};
page5Animation();

function page7Animation() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 15,
    freeMode: true,
  });
};

page7Animation();