// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Font,
//   PDFDownloadLink,
// } from "@react-pdf/renderer";

// // ✅ Register Tamil font
// Font.register({
//   family: "NotoSansTamil",
//   src: "/fonts/NotoSansTamil-Regular.ttf",
// });

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 12,
//     fontFamily: "NotoSansTamil", // ✅ Tamil-enabled font
//   },
//   header: {
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     fontFamily: "NotoSansTamil",
//   },
//   subHeader: {
//     textAlign: "center",
//     fontSize: 14,
//     marginBottom: 20,
//     fontFamily: "NotoSansTamil",
//   },
//   infoSection: {
//     marginBottom: 15,
//   },
//   infoText: {
//     marginBottom: 3,
//     fontFamily: "NotoSansTamil",
//   },
//   table: {
//     display: "table",
//     width: "auto",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderRightWidth: 0,
//     borderBottomWidth: 0,
//     marginBottom: 15,
//   },
//   tableRow: {
//     flexDirection: "row",
//   },
//   tableColHeader: {
//     width: "16.66%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     backgroundColor: "#eeeeee",
//     textAlign: "center",
//     fontWeight: "bold",
//     padding: 3,
//     fontFamily: "NotoSansTamil",
//   },
//   tableCol: {
//     width: "16.66%",
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//     padding: 3,
//     textAlign: "center",
//     fontFamily: "NotoSansTamil", // ✅ Tamil text inside table
//   },
//   totalText: {
//     textAlign: "right",
//     fontWeight: "bold",
//     marginTop: 5,
//     fontFamily: "NotoSansTamil",
//   },
//   customerInfoHeader: {
//     backgroundColor: "#f0f0f0",
//     padding: 5,
//     fontWeight: "bold",
//     marginBottom: 5,
//     fontFamily: "NotoSansTamil",
//   },
// });

// export function CustomerPDF({ customer }) {
//   return (
//     <Document>
//       <Page style={styles.page}>
//         <Text style={styles.header}>HariHaran Trader Sivakasi</Text>
//         <Text style={styles.subHeader}>List Of Order Placed</Text>

//         <View style={styles.infoSection}>
//           <Text style={styles.infoText}>
//             Order Number: {customer.orderNumber}
//           </Text>
//           <Text style={styles.infoText}>Order Date: {customer.orderDate}</Text>
//           <Text style={styles.infoText}>
//             Mobile Number: {customer.customerNumber}
//           </Text>
//         </View>

//         {/* Table */}
//         <View style={styles.table}>
//           {/* Header Row */}
//           <View style={styles.tableRow}>
//             <Text style={styles.tableColHeader}>S.No</Text>
//             <Text style={styles.tableColHeader}>Cracker Name</Text>
//             <Text style={styles.tableColHeader}>Tamil Cracker Name</Text>
//             <Text style={styles.tableColHeader}>Qty</Text>
//             <Text style={styles.tableColHeader}>80% Discount Rate</Text>
//             <Text style={styles.tableColHeader}>Amount</Text>
//           </View>

//           {/* Data Rows */}
//           {customer.items.map((item, index) => (
//             <View style={styles.tableRow} key={index}>
//               <Text style={styles.tableCol}>{index + 1}</Text>
//               <Text style={styles.tableCol}>{item.name}</Text>
//               <Text style={styles.tableCol}>{item.tamilName}</Text>
//               <Text style={styles.tableCol}>{item.quantity}</Text>
//               <Text style={styles.tableCol}>{item.rate}</Text>
//               <Text style={styles.tableCol}>{item.amount.toFixed(2)}</Text>
//             </View>
//           ))}
//         </View>

//         <Text style={styles.totalText}>
//           Total Amount: ₹{customer.totalRate.toFixed(2)}
//         </Text>

//         {/* Customer Info */}
//         <View style={{ marginTop: 15 }}>
//           <Text style={styles.customerInfoHeader}>Customer Information</Text>
//           <Text style={styles.infoText}>
//             Customer Name: {customer.customerName}
//           </Text>
//           <Text style={styles.infoText}>
//             Customer Number: {customer.customerNumber}
//           </Text>
//           <Text style={styles.infoText}>
//             Customer Address: {customer.customerAddress}
//           </Text>
//           <Text style={styles.infoText}>
//             Customer State: {customer.customerState}
//           </Text>
//           <Text style={styles.totalText}>
//             Overall Total Amount: ₹{customer.totalRate.toFixed(2)}
//           </Text>
//         </View>
//       </Page>
//     </Document>
//   );
// }

// // ✅ PDF Download Button
// export function CustomerPDFDownload({ customer }) {
//   return (
//     <PDFDownloadLink
//       document={<CustomerPDF customer={customer} />}
//       fileName={`${customer.customerName}_invoice.pdf`}
//       style={{
//         textDecoration: "none",
//         padding: "6px 12px",
//         backgroundColor: "#4caf50",
//         color: "white",
//         borderRadius: "4px",
//         marginLeft: "8px",
//       }}
//     >
//       {({ loading }) => (loading ? "Loading PDF..." : "Download PDF")}
//     </PDFDownloadLink>
//   );
// }


import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// ✅ Register Tamil font
Font.register({
  family: "NotoSansTamil",
  src: "/fonts/NotoSansTamil-Regular.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "NotoSansTamil", // ✅ Tamil-enabled font
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "NotoSansTamil",
  },
  subHeader: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
    fontFamily: "NotoSansTamil",
  },
  infoSection: {
    marginBottom: 15,
  },
  infoText: {
    marginBottom: 3,
    fontFamily: "NotoSansTamil",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#eeeeee",
    textAlign: "center",
    fontWeight: "bold",
    padding: 3,
    fontFamily: "NotoSansTamil",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    textAlign: "center",
    fontFamily: "NotoSansTamil", // ✅ Tamil text inside table
  },
  totalText: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: 5,
    fontFamily: "NotoSansTamil",
  },
  customerInfoHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "NotoSansTamil",
  },
});

export function CustomerPDF({ customer }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>HariHaran Trader Sivakasi</Text>
        <Text style={styles.subHeader}>List Of Order Placed</Text>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Order Number: {customer.orderNumber}
          </Text>
          <Text style={styles.infoText}>Order Date: {customer.orderDate}</Text>
          <Text style={styles.infoText}>
            Mobile Number: {customer.customerNumber}
          </Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            <Text style={{ ...styles.tableColHeader, width: "8%" }}>S.No</Text>
            <Text style={{ ...styles.tableColHeader, width: "20%" }}>
              Cracker Name
            </Text>
            <Text
              style={{
                ...styles.tableColHeader,
                width: "30%",
                textAlign: "left", // ✅ Tamil column left aligned
              }}
            >
              Tamil Cracker Name
            </Text>
            <Text style={{ ...styles.tableColHeader, width: "10%" }}>Qty</Text>
            <Text style={{ ...styles.tableColHeader, width: "15%" }}>
              80% Discount Rate
            </Text>
            <Text style={{ ...styles.tableColHeader, width: "17%" }}>
              Amount
            </Text>
          </View>

          {/* Data Rows */}
          {customer.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={{ ...styles.tableCol, width: "8%" }}>
                {index + 1}
              </Text>
              <Text style={{ ...styles.tableCol, width: "20%" }}>
                {item.name}
              </Text>
              <Text
                style={{
                  ...styles.tableCol,
                  width: "30%",
                  textAlign: "left", // ✅ Tamil text left aligned
                }}
              >
                {item.tamilName}
              </Text>
              <Text style={{ ...styles.tableCol, width: "10%" }}>
                {item.quantity}
              </Text>
              <Text style={{ ...styles.tableCol, width: "15%" }}>
                {item.rate}
              </Text>
              <Text style={{ ...styles.tableCol, width: "17%" }}>
                {item.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.totalText}>
          Total Amount: ₹{customer.totalRate.toFixed(2)}
        </Text>

        {/* Customer Info */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.customerInfoHeader}>Customer Information</Text>
          <Text style={styles.infoText}>
            Customer Name: {customer.customerName}
          </Text>
          <Text style={styles.infoText}>
            Customer Number: {customer.customerNumber}
          </Text>
          <Text style={styles.infoText}>
            Customer Address: {customer.customerAddress}
          </Text>
          <Text style={styles.infoText}>
            Customer State: {customer.customerState}
          </Text>
          <Text style={styles.totalText}>
            Overall Total Amount: ₹{customer.totalRate.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

// ✅ PDF Download Button
export function CustomerPDFDownload({ customer }) {
  return (
    <PDFDownloadLink
      document={<CustomerPDF customer={customer} />}
      fileName={`${customer.customerName}_invoice.pdf`}
      style={{
        textDecoration: "none",
        padding: "6px 12px",
        backgroundColor: "#4caf50",
        color: "white",
        borderRadius: "4px",
        marginLeft: "8px",
      }}
    >
      {({ loading }) => (loading ? "Loading PDF..." : "Download PDF")}
    </PDFDownloadLink>
  );
}
