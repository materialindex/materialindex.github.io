function changeBackground(element) {
  let observer = new IntersectionObserver(
    function (entries) {
      //console.log(element.id, entries[0].intersectionRatio > 0.2)
      if (entries[0].intersectionRatio < 0.2) return;
      element.style.transition = 'background-color 1s ease';
      element.style.backgroundColor = 'var(--bs-secondary)';
    },
    {
      threshold: 0.4
    }
  );
  observer.observe(element);
}

function changeBannerText(text, index) {
  const wrapper = document.querySelector(`.banner-text-${index}`);
  //console.log('wrapper')
  if (!wrapper) return null;
  wrapper.style.display = 'none';
  setTimeout(() => {
    textElement = wrapper.firstChild;
    textElement.innerText = text || '';
    textElement.classList.remove(`banner-text-${index}`);
    void textElement.offsetWidth; // Triggers dom refresh
    textElement.classList.add(`banner-text-${index}`);
    wrapper.style.display = 'block';
  }, 0);
}

function changeBannerImage(image, index) {
  const wrapper = document.getElementById('banner-images');
  var arr = document.querySelectorAll('.banner');
  const div = arr[0];
  //console.log('setting opacity', div.id)
  //div.style.opacity = 1
  arr.forEach((el) => (el.style.opacity = 1));
  setTimeout(function () {
    //console.log('removing', div.id)
    div.remove();
  }, 2000);

  const el = document.createElement('div');
  el.id = index;
  el.classList = 'fadein banner p-4 p-md-5 mb-4 full-height';
  el.style.backgroundImage = `url('img/${image}')`;
  el.style.opacity = 0;
  wrapper.append(el);
}

const bannerTexts = [
  ['A Circular Construction Industry'],
  ['Digitising Reclaim'],
  // ['Valuing building components'],
  ['Turning Waste into Assets']
];

const bannerImages = ['525_Material Index_Team_07.jpg', '525_Material Index_Site_01a.jpg', 'circlus_banner_01.jpg'];

document.fonts.ready.then(function () {
  let index = 0;
  function setTexts() {
    changeBannerText(bannerTexts[index % bannerTexts.length][0], 0);
    //changeBannerImage(images[index])
    index++; // Increment index and wrap around to the beginning if necessary
    changeBannerImage(bannerImages[index % bannerImages.length], index);
  }

  changeBannerImage(bannerImages[index % bannerImages.length], index);
  setInterval(setTexts, 3000);
  setTexts();
});

document.querySelectorAll('.intersect').forEach((el) => {
  window[el.dataset.function](el);
});

//addEventListener("DOMContentLoaded");
