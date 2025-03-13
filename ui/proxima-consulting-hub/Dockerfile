## BASE ##
FROM node:23.7-alpine as base

RUN apk update
RUN apk add --no-cache bash
RUN apk add --update npm
RUN npm install -g npm@11.1.0

ARG WORK_DIR=/opt/app

# Define Workdir for all Stages
WORKDIR $WORK_DIR
#----------------------------------------------------------------

## DEVELOPMENT ##
FROM base as development

# Cannot exist in the production layer
COPY package.json ./

RUN npm install

COPY . .
#----------------------------------------------------------------

## BUILDER ##
FROM base as builder

COPY package.json ./

# RUN apk add --no-cache libc6-compat
RUN npm install
COPY . .

RUN npm run build
#----------------------------------------------------------------
    
#------------------------Final Stage-----------------------------
## RUNNER ##
FROM base as runner
SHELL ["/bin/sh", "-c"]

# dumb-init occupies PID 1 and takes care of all the responsibilities.
RUN apk add dumb-init

ENV NODE_ENV=production

RUN mkdir -p /etc/skel/

RUN echo 'history -c \
/bin/rm -f /opt/remote/.mysql_history \
/bin/rm -f /opt/remote/.history \
/bin/rm -f /opt/remote/.bash_history' >> /etc/skel/.logout

RUN echo 'set autologout = 30 \
set prompt = "$ " \
set history = 0 \
set ignoreeof' >> /etc/skel/.cshrc

RUN cp /etc/skel/.cshrc /etc/skel/.profile

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs $WORK_DIR
USER nextjs

COPY --from=builder --chown=nextjs:nodejs $WORK_DIR/public ./public
COPY --from=builder --chown=nextjs:nodejs $WORK_DIR/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs $WORK_DIR/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "server.js"]