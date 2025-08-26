// import React from "react";
// import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink } from "@react-pdf/renderer";

// // Optional: Add Tamil/Custom fonts if needed
// // Font.register({ family: "NotoSans", src: "/path/to/NotoSans-Regular.ttf" });

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontSize: 12,
//   },
//   section: {
//     marginBottom: 10,
//   },
//   header: {
//     fontSize: 16,
//     marginBottom: 10,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     borderBottomStyle: "solid",
//     marginBottom: 5,
//     paddingBottom: 2,
//   },
//   tableRow: {
//     flexDirection: "row",
//     marginBottom: 2,
//   },
//   cell: {
//     flex: 1,
//     padding: 2,
//   },
//   total: {
//     fontWeight: "bold",
//   },
// });

// export function CustomerPDF({ customer }) {
//   return (
//     <Document>
//       <Page style={styles.page}>
//         <Text style={styles.header}>Customer Invoice</Text>

//         <View style={styles.section}>
//           <Text>Name: {customer.customerName}</Text>
//           <Text>Phone: {customer.customerNumber}</Text>
//           <Text>Address: {customer.customerAddress}</Text>
//           <Text>State: {customer.customerState}</Text>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.tableHeader}>
//             <Text style={styles.cell}>Item</Text>
//             <Text style={styles.cell}>Qty</Text>
//             <Text style={styles.cell}>Rate</Text>
//             <Text style={styles.cell}>Amount</Text>
//           </View>

//           {customer.items.map((item, i) => (
//             <View style={styles.tableRow} key={i}>
//               <Text style={styles.cell}>{item.name}</Text>
//               <Text style={styles.cell}>{item.quantity}</Text>
//               <Text style={styles.cell}>₹{item.rate}</Text>
//               <Text style={styles.cell}>₹{item.amount}</Text>
//             </View>
//           ))}

//           <View style={[styles.tableRow, styles.total]}>
//             <Text style={styles.cell}>Total</Text>
//             <Text style={styles.cell}></Text>
//             <Text style={styles.cell}></Text>
//             <Text style={styles.cell}>₹{customer.totalRate.toFixed(2)}</Text>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );
// }

// // Optional Download Button Component
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

// Optional: register Tamil/Custom font
// Font.register({ family: "NotoSans", src: "/path/to/NotoSans-Regular.ttf" });

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 15,
  },
  infoText: {
    marginBottom: 3,
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
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#eeeeee",
    textAlign: "center",
    fontWeight: "bold",
    padding: 3,
  },
  tableCol: {
    width: "16.66%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    textAlign: "center",
  },
  totalText: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: 5,
  },
  customerInfoHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export function CustomerPDF({ customer }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>HariHaran Trader Sivakasi</Text>
        <Text style={styles.subHeader}>List Of Order Placed</Text>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Order Number: {customer.orderNumber}</Text>
          <Text style={styles.infoText}>Order Date: {customer.orderDate}</Text>
          <Text style={styles.infoText}>Mobile Number: {customer.customerNumber}</Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>S.No</Text>
            <Text style={styles.tableColHeader}>Cracker Name</Text>
            <Text style={styles.tableColHeader}>Tamil Cracker Name</Text>
            <Text style={styles.tableColHeader}>Qty</Text>
            <Text style={styles.tableColHeader}>80% Discount Rate</Text>
            <Text style={styles.tableColHeader}>Amount</Text>
          </View>

          {/* Data Rows */}
          {customer.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{index + 1}</Text>
              <Text style={styles.tableCol}>{item.name}</Text>
              <Text style={styles.tableCol}>{item.tamilName}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>{item.rate}</Text>
              <Text style={styles.tableCol}>{item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.totalText}>
          Total Amount: ₹{customer.totalRate.toFixed(2)}
        </Text>

        {/* Customer Info */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.customerInfoHeader}>Customer Information</Text>
          <Text style={styles.infoText}>Customer Name: {customer.customerName}</Text>
          <Text style={styles.infoText}>Customer Number: {customer.customerNumber}</Text>
          <Text style={styles.infoText}>Customer Address: {customer.customerAddress}</Text>
          <Text style={styles.infoText}>Customer State: {customer.customerState}</Text>
          <Text style={styles.totalText}>
            Overall Total Amount: ₹{customer.totalRate.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

// Download Component
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
