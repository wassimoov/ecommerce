import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTotals } from "../../Features/cartSlice";

const PdfCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  // const url = process.env.REACT_APP_ADRESSE + "api/articles/";

  // const [rows, setRows] = useState([]);
  // useEffect(() => {
  //   axios.get(url).then((res) => {
  //     setRows(res.data);
  //   });
  // }, []);

  const generatePDF = (tableRows, columns, isLandscape) => {
    const doc = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
    });

    doc.autoTable({
      head: columns,
      body: tableRows,
      startY: 20, // startY is basically margin-top
      headStyles: {
        fillColor: [241, 196, 15],
        fontSize: 12,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 30, cellHeight: 20, halign: "center" },
        1: { cellWidth: 40, halign: "center" },
        2: { cellWidth: "auto", halign: "center", fontStyle: "bold" },
        3: { cellWidth: 30, halign: "center" },
        4: { cellWidth: 30, halign: "center" },
      },
      styles: {
        valign: "middle",
      },

      /* Use for customizing texts or styles of specific cells after they have been formatted by this plugin. This hook is called just before the column width and other features are computed.*/

      didParseCell: function (data) {
        if (data.section === "body") {
          data.row.height = 20;
        }
        if (data.column.dataKey === "imageartpetitf") {
          data.cell.text = ""; // Use an icon in didDrawCell instead
          const url = process.env.REACT_APP_ADRESSE + "public/";
          data.cell.raw = `data:image/image/png;base64,${data.cell.raw}`;
        }
      },

      /* Use for adding content to the cells after they are drawn. This could be images or links. You can also use this to draw other custom jspdf content to cells with doc.text or doc.rect for example.*/

      didDrawCell: function (data) {
        if (
          data.row.section === "body" &&
          data.column.dataKey === "imageartpetitf" &&
          data.cell.raw
        ) {
          doc.addImage(
            data.cell.raw,
            "PNG",
            data.cell.x + 5,
            data.cell.y + 2,
            13,
            16
          );
        }
      },
    });

    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    const date1 = date[1] + "/" + date[2] + "/" + date[3];
    // total
    doc.text(` Sfax le :  ${date1} `, 14, 15);
    doc.text(` Total : ${cart.cartTotalAmount.toFixed(3)} TND`, 25, 20);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
  };

  const columnsPDF = [
    {
      imageartpetitf: "imageartpetitf",
      marque: "Marque",
      designation: "Désignation",
      cartQuantity: "Quantité",
      price: "Prix",
    },
  ];

  return (
    <>
      <button
        style={{
          color: "yellow",
          backgroundColor: "teal",
          height: 70,
          position: "fixed",
          top: 150,
          left: 150,
          cursor: "pointer",
        }}
        onClick={() =>
          generatePDF(
            cart.cartItems.map((m) => ({
              imageartpetitf: m.imageartpetitf,
              marque: m.marque,
              designation: m.designation,
              cartQuantity: m.cartQuantity,
              price: (m.prixVente * m.cartQuantity).toFixed(3),
            })),
            columnsPDF,
            true
          )
        }
      >
        DOWNLOAD PDF
      </button>
    </>
  );
};
export default PdfCart;
