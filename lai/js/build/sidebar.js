jQuery( document ).ready(function() {


  // show/hide element */

  function show(ele) {
    var srcElement = document.getElementById(ele);
      if(srcElement != null) {
              if(srcElement.style.display == 'block') {
                  srcElement.style.display = 'none';
            }
        else {
          srcElement.style.display = 'block';
        }
        return false;
      }
        }

  function showsidebar(ele) {
    var srcElement = document.getElementById(ele);
      if(srcElement != null) {
              if(srcElement.style.display == 'inline') {
                  srcElement.style.display = 'none';
            }
        else {
          srcElement.style.display = 'inline';
        }
        return false;
      }
        }


        function sidebarHide(sh){
          if(window.innerWidth > 640)document.getElementById("sidebar-content").style.display = "block";
          if(document.getElementById('sidebarshow').style.display == 'block' && window.innerWidth < 640)document.getElementById('sidebar-content').style.display = 'none';
        }
        window.onresize=sidebarHide
        window.onload=sidebarHide
		
		

});