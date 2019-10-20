export function typeDrugName() {
  $('#title-search-input').val('Арбидол');
  $('.btn-search').click();
}

export function parseSearchResult() {
  var r = [];

  $('.cartName').each(function () { 
      r.push($(this).text()); 
  });

  return r;
}

export function chooseDrugStore() {
  // $('.chooseStock').trigger('click');
  // $('#133-header').trigger('click');
  // $('#yt1').click();

  var click_ev = document.createEvent("MouseEvents");
// initialize the event
  click_ev.initEvent("click", true /* bubble */, true /* cancelable */);
// trigger the event
  // document.querySelector('.chooseStock').dispatchEvent(click_ev);
  document.querySelector('.chooseStock').click();
  console.log('continue');
  document.getElementById('#133-header').click();
  document.getElementById('#yt1').click();
}

export function getChosenDrugStore() {
  return $('.chooseStock').text();
}