<template>
  <v-card>
    <h2 class="d-flex align-center justify-center py-3">Privacy Policy</h2>
    <v-divider />
    <v-col>
      <v-responsive :aspect-ratio="16 / 9">
        <div class="px-lg-4 px-md-3 px-sm-2">
          <h3>Information we obtain</h3>
          <p class="mb-1">The Service obtains the following information.</p>
          <ul>
            <li>Full name(including nicknames and pen names)</li>
            <li>
              IDs used by the customer in external services and other information that the customer
              has authorized the linked party to disclose according to the privacy settings of the
              external service
            </li>
          </ul>
          <br />
          <h3>Purposes for which we use your information</h3>
          <p class="mb-1">
            The Service will use information obtained from customers for the following purposes.
          </p>
          <ul>
            <li>
              To accept registrations, identify and authenticate customers in relation to this
              service
            </li>
            <li>To manage the customer's usage history of the Service</li>
            <li>
              To analyze the customer's activity history on the Service and use it to maintain and
              improve the Service
            </li>
            <li>To send information on affiliated businesses and services</li>
            <li>To respond to customer inquiries</li>
            <li>
              To notify you of changes to this service, discontinuation of provision, termination,
              or cancellation of the contract.
            </li>
            <li>
              In addition to the above, to provide, maintain, protect and improve this service
            </li>
          </ul>
          <br />
          <h3>Measures taken for safety management</h3>
          <p class="mb-1">
            Regarding the measures taken by the Service to manage the security of information
            obtained from customers, we will respond to each customer individually in accordance
            with the provisions of laws and regulations when the customer contacts the contact
            listed at the end of this document.
          </p>
          <br />
          <h3>Third Party Offerings</h3>
          <p class="mb-1">
            The Service will not provide personal data (Article 2, Paragraph 6 of the Act on the
            Protection of Personal Information) to any third party (including parties located
            outside Japan) without prior consent from the customer. The Service will not provide
            such information to third parties (including parties located outside of Japan) without
            prior consent of the customer.
          </p>
          <ul>
            <li>Outsourcing the handling of personal data</li>
            <li>This service has been acquired</li>
            <li>
              Joint use with business partners (if there are specific joint uses, the details will
              be announced separately).
            </li>
            <li>
              Other information that is legally permitted by law to be provided to third parties
            </li>
          </ul>
          <br />
          <h3>Access Analysis Tools</h3>
          <p class="mb-1">
            This service uses "Google Analytics" to analyze your access to our website. Google
            Analytics uses cookies to collect traffic data. Traffic data is collected anonymously
            and does not personally identify you; you can refuse the collection of this information
            by disabling cookies. Please check your browser settings for more information, or click
            <a
              :href="'https://marketingplatform.google.com/about/analytics/terms/jp/'"
              target="_blank"
              class="text-blue-600"
              >here</a
            >
            to learn more about Google Analytics.
          </p>
          <br />
          <h3>Privacy Policy Changes</h3>
          <p>
            The Service will change the contents of this Privacy Policy as necessary. In this case,
            the Service will make known or notify you of the effective date and content of the
            revised Privacy Policy by appropriate means.
          </p>
          <br />
          <h3>Contact</h3>
          <p>
            If you have any comments, requests, or wish to correct, stop using, or delete user
            information, please contact us
            <a
              :href="'https://forms.gle/ywb5Q35iHSBmYM4s5'"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600"
              >here</a
            >.
          </p>
        </div>
      </v-responsive>
    </v-col>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="resetDialog()"> CLOSE </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.resetDialog();
      }
    },
  },
  methods: {
    resetDialog() {
      this.$emit('reset-dialog');
    },
  },
};
</script>
