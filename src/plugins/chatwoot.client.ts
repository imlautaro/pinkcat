export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.hooks.hook('vue:setup', () => {
		const {
			public: { chatwootWebsiteToken },
		} = useRuntimeConfig()

		if (chatwootWebsiteToken) {
			useHead({
				script: [
					{
						children: `(function(d,t) {
                            var BASE_URL="https://app.chatwoot.com";
                            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                            g.src=BASE_URL+"/packs/js/sdk.js";
                            g.defer = true;
                            g.async = true;
                            s.parentNode.insertBefore(g,s);
                            g.onload=function(){
                              window.chatwootSDK.run({
                                websiteToken: '${chatwootWebsiteToken}',
                                baseUrl: BASE_URL
                              })
                            }
                          })(document,"script");`,
						tagPriority: 'high',
						async: true,
						type: 'text/partytown',
					},
				],
			})
		}
	})
})
