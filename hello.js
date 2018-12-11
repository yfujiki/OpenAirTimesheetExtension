chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        const tsTables = $("table.timesheet");
        const tsTable = tsTables[tsTables.length - 1];
        const tsBody = $(tsTable).find("tbody")[0];
        const tsRows = $(tsBody).find("tr").not(".gridDataEmptyRow");
        const emptyRows = $(tsBody).find("tr.gridDataEmptyRow");

        const sortedRows = tsRows.sort(function(a, b) {
            const textA = $(a).find('select.timesheetControlPopupCustomerProject option[selected]')[0].innerHTML;
            const textB = $(b).find('select.timesheetControlPopupCustomerProject option[selected]')[0].innerHTML;
            if (textA > textB) {
                return 1;
            }
            if (textA < textB) {
                return -1;
            }
            
            const childTextA = $(a).find('select.timesheetControlPopup option[selected]')[0].innerHTML;
            const childTextB = $(b).find('select.timesheetControlPopup option[selected]')[0].innerHTML;
            if (childTextA > childTextB) {
                return 1;
            }
            if (childTextA < childTextB) {
                return -1;
            }
            return 0;
        });
        
        $(tsBody).empty();
        $(tsBody).append(sortedRows);
        $(tsBody).append(emptyRows);
      }
    }
  );