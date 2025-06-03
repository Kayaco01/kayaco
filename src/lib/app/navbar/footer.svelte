<script lang="ts">

  import { FacebookIcon, MailIcon, InstagramIcon } from '@lucide/svelte';
	
</script>

<footer class="mt-24 space-y-6 text-center lg:mt-48 lg:px-24 lg:text-start bg-blue-200 text-blue-900 px-8 py-12">
  <div class="max-w-7xl mx-auto">
    <!-- Footer Columns -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-base">
    
      <div>
        <h3 class="font-semibold mb-4">Learn</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:underline">How to Order</a></li>
          <li><a href="/kmart/track-order" class="hover:underline">Track your Order</a></li>
          <li><a href="#" class="hover:underline">FAQs</a></li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold mb-4">More from KayaCo</h3>
        <ul class="space-y-2">
          <li><a href="/login" class="hover:underline">Sign In</a></li>
          <li><a href="#" class="hover:underline">Locations</a></li>
          <li><a href="#" class="hover:underline">Affiliates</a></li>
        </ul>
      </div>

      <div class="flex flex-col items-center md:items-end">
        <h3 class="font-semibold mb-4">Contact us</h3>
        <div class="flex space-x-4 text-white">
          <FacebookIcon class="bg-blue-900 p-2 rounded-full w-10 h-10"></FacebookIcon>
          <MailIcon class="bg-blue-900 p-2 rounded-full w-10 h-10"></MailIcon>
          <InstagramIcon class="bg-blue-900 p-2 rounded-full w-10 h-10"></InstagramIcon>
        </div>
      </div>
    </div>

    <div class="mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-blue-800">
      <span>ApcasTech | 2025</span>
      <div class="space-x-3 mt-2 md:mt-0">
        <a href="#" class="hover:underline">Terms of Service</a>
        <span>|</span>
        <a href="#" class="hover:underline">Privacy Policy</a>
        <span>|</span>
        <a href="#" class="hover:underline">Refund Policy</a>
        <span>|</span>
        <a href="#" class="hover:underline">Website Accessibility</a>
      </div>
    </div>
  </div>

    <div class="flex w-full flex-col gap-4 text-center md:w-1/2 md:text-start">
      <h1 class="text-xl font-bold">Partnership</h1> 
      <div class="flex items-center justify-center gap-2 md:justify-start">
      <img src="/img/satamakaba-logo.png" alt="logo" class="h-16 w-18">
      </div></div>
</footer>
