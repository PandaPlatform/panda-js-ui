(function ($) {
    'use strict';

    Panda.Ui.DataTable = $.extend(Panda.Ui.DataTable || {}, {
        init: function () {
            // Sort on lick
            $(document).on("click", ".uiDataTable .DataTableList > .DataTableHeader > .DataTableCell", function () {
                Panda.Ui.DataTable.sort($(this).closest(".uiDataTable .DataTableList"), $(this));
            });

            // Check on click
            $(document).on("click", ".uiDataTable .DataTableRow", function (ev) {
                if (ev.metaKey || ev.ctrlKey || ev.altKey) {
                    $(this).closest(".DataTableRow").find(".DataTableCheck input[type='checkbox']").trigger("click");
                }
            });

            // Update checks
            $(document).on("click", ".uiDataTable .DataTableHeader > .DataTableCheck [type='checkbox']", function () {
                var checked = $(this).prop("checked");
                var glist = $(this).closest(".uiDataTable");
                var rows = glist.find(".DataTableRow");
                var checks = rows.find(".DataTableCheck [type='checkbox']");

                checks.prop("checked", checked);
                if (checked) {
                    rows.addClass("selected");
                } else {
                    rows.removeClass("selected");
                }

                glist.removeData("shift-pivot");
                glist.removeData("lastIndex");

                $(this).trigger("listUpdated.uiDataTable", rows.filter(".selected").length);
            });

            // Update all checked rows
            $(document).on("change", ".uiDataTable .DataTableRow > .DataTableCheck [type='checkbox']", function (ev) {
                var thisCheck = $(this);
                var glist = $(this).closest(".uiDataTable");

                var rows = glist.find(".DataTableRow");
                var checks = rows.find(".DataTableCheck [type='checkbox']");
                var checkAll = $(".DataTableHeader > .DataTableCheck [type='checkbox']", glist);

                var idx;
                if (!ev.ctrlKey && (!ev.shiftKey)) {
                    //thisRow.toggleClass("selected");
                    idx = thisCheck.closest(".DataTableRow").index();
                    glist.data("shift-pivot", idx);
                    glist.data("lastIndex", idx);
                } else if (ev.shiftKey) {
                    var thisIndex = thisCheck.closest(".DataTableRow").index();
                    var pivotIndex = glist.data("shift-pivot");
                    var lastIndex = glist.data("lastIndex");
                    if ($.type(pivotIndex) === "undefined") {
                        pivotIndex = thisIndex;
                        glist.data("shift-pivot", thisIndex);
                    }
                    if (lastIndex !== undefined)
                        rows.slice(Math.min(lastIndex, thisIndex), Math.max(lastIndex, thisIndex) + 1).find(".DataTableCheck [type='checkbox']").prop("checked", false);
                    rows.slice(Math.min(pivotIndex, thisIndex), Math.max(pivotIndex, thisIndex) + 1).find(".DataTableCheck [type='checkbox']").prop("checked", true);
                    glist.data("lastIndex", thisIndex);
                } else {
                    idx = thisCheck.closest(".DataTableRow").index();
                    checks.prop("checked", false);
                    thisCheck.prop("checked", true);
                    glist.data("shift-pivot", idx);
                    glist.data("lastIndex", idx);
                }

                checks.filter(":checked").closest(".DataTableRow").addClass("selected").end().end()
                    .not(":checked").closest(".DataTableRow").removeClass("selected");

                var checkedLength = rows.filter(".selected").length;
                checkAll.prop("checked", false);
                if (checkedLength) {
                    checkAll.prop("checked", true);
                }

                $(this).trigger("listUpdated.uiDataTable", checkedLength);
            });

            // On form reset
            $(document).on("reset", "form:has(.uiDataTable)", function (ev) {
                Panda.Ui.DataTable.reset($(this));
            });
        },
        initialize: function () {
            // Get init objects and remove initialize class
            var gLists = $(".uiDataTable.initialize").removeClass("initialize");

            gLists.find(".DataTableList .DataTableRow > .DataTableCheck :checked")
                .closest(".DataTableRow").addClass("selected").closest(".uiDataTable").find(".DataTableHeader > .DataTableCheck [type='checkbox']").prop("checked", true);

            gLists.each(function () {
                var jqthis = $(this);
                jqthis.data("column-ratios", jqthis.data("column-ratios"));
                jqthis.removeAttr("data-column-ratios");

                this.getRowCount = function () {
                    return $(this).find(".DataTableContentWrapper .DataTableRow").length;
                };
                this.getSelectedRowCount = function () {
                    return $(this).find(".DataTableContentWrapper .DataTableRow.selected").length;
                };
                this.assignRowIdentifier = function (identifier) {
                    var rand = "grow_" + Math.floor(Math.random() * 10000000000);
                    var row;
                    if ($.type(identifier) === "number") {
                        row = $(this).find(".DataTableContentWrapper .DataTableRow").eq(identifier);
                    } else {
                        row = jqthis.find(identifier).first().closest(".DataTableRow");
                    }
                    row.data("identifier", rand);
                    return rand;
                };
                this.identifyRow = function (identifier) {
                    return $(this).find(".DataTableContentWrapper .DataTableRow").filter(function () {
                        return $(this).data("identifier") === identifier;
                    }).index();
                };

                this.searchRows = function (column, regexp) {
                    var jqthis = $(this);
                    var rows = jqthis.find(".DataTableContentWrapper .DataTableRow");

                    if (rows.length === 0) {
                        return -1;
                    }

                    var indexes = [];
                    var index = column;
                    var headerCells = jqthis.find(".DataTableHeader > .DataTableCell");
                    if ($.type(column) === "string") {
                        var c = headerCells.filter(function () {
                            return $(this).data("column-name") === column;
                        });
                        index = headerCells.index(c);
                    }

                    if ($.type(index) !== "number" || index < 0) {
                        return -1;
                    }

                    rows.filter(function () {
                        return regexp.test($(this).find(".DataTableCell").eq(index).text());
                    }).each(function (i) {
                        indexes[i] = $(this).index();
                    });

                    return indexes;
                };

                this.getRow = function (ri) {
                    var row;
                    if ($.type(ri) === "number") {
                        row = $(this).find(".DataTableList .DataTableRow").eq(ri);
                    } else {
                        row = $(this).find(".DataTableList .DataTableRow").filter(function () {
                            return $(this).data("identifier") === ri;
                        });
                    }
                    return row;
                };

            });
        },
        addRow: function (DataTableList, contents) {
            // Get data grid list
            var jqDataTableList = $(DataTableList);

            // Get content and transform if necessary
            var length = 0;
            if ($.type(contents) === "undefined" || $.type(contents) === "null") {
                length = jqDataTableList.find(".DataTableHeader > .DataTableCell").length;
                contents = [];
                for (var i = 0; i < length; i++) {
                    contents[i] = "<span class='DataTableTextWrapper' style='max-width:100%;width:100%;box-sizing:border-box;'></span>";
                }
            } else {
                length = contents.length;
                for (var i = 0; i < length; i++) {
                    if ($.type(contents[i]) === "string") {
                        contents[i] = "<span class='DataTableTextWrapper' style='max-width:100%;width:100%;box-sizing:border-box;'>" + $("<div />").text(contents[i]).html() + "</span>";
                    }
                }
            }

            var row = $("<li />").addClass("DataTableRow");
            var ratio = 100;
            if (jqDataTableList.closest(".uiDataTable").hasClass("checkable")) {
                ratio = 100 - 8;
                var input = $("<input />").attr("type", "checkbox").attr("name", "files[]");
                $("<div />").addClass("DataTableCheck").append(input).prependTo(row);
            }

            var cell = $("<div />").addClass("DataTableCell");
            var width = ratio / length;
            var columnRatios = jqDataTableList.find(".DataTableList").data("column-ratios");
            for (var i = 0; i < length; i++) {
                if ($.type(columnRatios) === "object") {
                    width = columnRatios[i];
                }
                cell.clone().css("width", width + "%").append(contents[i]).appendTo(row);
            }

            jqDataTableList.find(".DataTableContentWrapper").prepend(row);

            // Focus on first 'name' element of the row
            row.find(".DataTableCell input, .DataTableCell select, .DataTableCell textarea").first().trigger("focus");
        },
        removeRow: function (DataTableList, identifier) {
            var jqDataTableList = $(DataTableList);

            if ($.type(identifier) === "number") {
                jqDataTableList.find(".DataTableContentWrapper .DataTableRow").eq(identifier).remove();
            }
            else if ($.type(identifier) === "string") {
                jqDataTableList.find(".DataTableContentWrapper .DataTableRow").filter(function () {
                    return $(this).data("identifier") === identifier;
                }).remove();
            }
        },
        replaceCell: function (DataTableList, row, column, replacement) {
            var jqDataTableList = $(DataTableList);

            if ($.type(replacement) === "string" || ($.type(replacement.tagName) !== "undefined" && replacement.tagName === "SPAN")) {
                replacement = "<span class='DataTableTextWrapper' style='max-width:100%;width:100%;box-sizing:border-box;'>" + $("<div>").text(replacement).html() + "</span>";
            }
            var cell = jqDataTableList.find(".DataTableRow").eq(row).children(".DataTableCell").eq(column);
            var oldValue = cell.contents().clone(true);
            cell.html(replacement);

            return oldValue;
        },
        getSelectedRows: function (DataTableList) {
            var jqDataTableList = $(DataTableList);

            var rows = {};
            var selected = jqDataTableList.find(".DataTableContentWrapper .DataTableRow.selected");

            if (selected.length === 0) {
                return;
            }

            var identifiers = [];
            jqDataTableList.find(".DataTableHeader > .DataTableCell").each(function (index) {
                identifiers[index] = $(this).data("column-name");
            });

            selected.each(function (idx) {
                rows[idx] = {};
                $(this).find(".DataTableCell").each(function (index) {
                    rows[idx][identifiers[index]] = $(this).text();
                });
                rows[idx]['__index'] = $(this).index();
            });

            selected = selected.clone();
            return rows;
        },
        removeSelectedRows: function (DataTableList) {
            var jqDataTableList = $(DataTableList);

            var rows = {};
            var removed = jqDataTableList.find(".DataTableContentWrapper .DataTableRow.selected").remove();

            if (removed.length === 0) {
                return;
            }

            removed.each(function (idx) {
                rows[idx] = {};
                $(this).find(".DataTableCell").each(function (index) {
                    var identifier = jqDataTableList.find(".DataTableHeader > .DataTableCell").eq(index).data("column-name");
                    rows[idx][identifier] = $(this).text();
                });
            });

            return rows;
        },
        sort: function (DataTableList, headerCell) {
            var jqCell = $(headerCell);

            // Set class
            DataTableList.find(".DataTableHeader > .DataTableCell")
                .not(jqCell).removeClass("selected ascending").end()
                .filter(jqCell).addClass("selected").toggleClass("ascending");

            // Sort
            var jqthiscol = jqCell.closest(".DataTableList").find(".DataTableRow").children(":nth-child(" + (jqCell.index() + 1) + ")");
            var sortByAscOrder = jqCell.hasClass("ascending");

            // Create collection to sort
            var collection = [];
            jqthiscol.each(function (index) {
                collection.push({"index": index, "value": $(this).text()});
            });

            if (collection.filter(function (c) {
                    return (!c.value && c.value !== 0)
                }).length !== 0) {
                return;
            }

            collection.sort(function (a, b) {
                a.value = (!isNaN(parseFloat(a.value)) && isFinite(a.value) ? parseFloat(a.value) : a.value );
                b.value = (!isNaN(parseFloat(b.value)) && isFinite(b.value) ? parseFloat(b.value) : b.value );
                if (sortByAscOrder) {
                    return (a.value < b.value ? -1 : 1);
                } else {
                    return (a.value > b.value ? -1 : 1);
                }
            });

            var jqthisrow = jqCell.closest(".uiDataTable").find(".DataTableRow");
            var collectionClone = jqthisrow.clone(true, true);
            for (var i in collection) {
                jqthisrow.eq(i).replaceWith(collectionClone.eq(collection[i].index));
            }
        },
        reset: function (DataTableList) {
            var jqDataTableList = $(DataTableList);
            setTimeout(function () {
                $(".uiDataTable .DataTableRow > .DataTableCheck [type='checkbox']", jqDataTableList)
                    .filter(":checked").closest(".DataTableRow").addClass("selected").end().end()
                    .not(":checked").closest(".DataTableRow.selected").removeClass("selected");
            }, 1);
        },
        clear: function (DataTableList) {
            // Get jQuery object (if not)
            var jqDataTableList = $(DataTableList);

            // Remove all grid list rows
            jqDataTableList.find(".DataTableContentWrapper .DataTableRow").remove();
        },
        filter: function (DataTableList, search) {
            // Get jQuery object (if not)
            var jqDataTableList = $(DataTableList);

            // If search is empty, show all rows
            if (search === "") {
                return jqDataTableList.find(".DataTableRow").show();
            }

            // Create the regular expression
            var regEx = new RegExp($.map(search.trim().split(' '), function (v) {
                return '(?=.*?' + v + ')';
            }).join(''), 'i');

            // Select all note rows, hide and filter by the regex then show
            jqDataTableList.find(".DataTableRow").hide().filter(function () {
                return regEx.exec($(this).text());
            }).each(function () {
                $(this).show();
            });
        }
    });
})(jQuery);
