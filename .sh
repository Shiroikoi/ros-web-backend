sudo apt install libcairo2-dev libjpeg-turbo8-dev libpng12-dev libtool-bin libossp-uuid-dev libpango1.0-dev libssh2-1-dev libvncserver-dev libwebsockets-dev libssl-dev build-essential autoconf

sudo add-apt-repository ppa:remmina-ppa-team/freerdp-daily
sudo apt-get update
sudo apt-get install freerdp2-dev freerdp2-x11

sudo apt-get install tomcat8 tomcat8-admin tomcat8-common tomcat8-user

cd ~

wget https://mirror.jframeworks.com/apache/guacamole/1.3.0/source/guacamole-server-1.3.0.tar.gz

wget https://apache.osuosl.org/guacamole/1.3.0/binary/guacamole-1.3.0.war

tar -xvzf guacamole-server-1.3.0.tar.gz
cd guacamole-server-1.3.0
autoreconf -fi
./configure --with-init-dir=/etc/init.d
make 
sudo make install
sudo ldconfig
sudo /etc/init.d/guacd start

sudo mkdir /etc/guacamole
sudo bash -c 'echo "GUACAMOLE_HOME=/etc/guacamole" >> /etc/default/tomcat8'
sudo cp guacamole-1.3.0.war /etc/guacamole/guacamole.war
sudo ln -s /etc/guacamole/guacamole.war /var/lib/tomcat8/webapps/
sudo mkdir /etc/guacamole/{extensions,lib}
sudo nano /etc/guacamole/guacamole.properties


guacd-hostname: localhost
guacd-port:    4822
user-mapping:    /etc/guacamole/user-mapping.xml


sudo nano /etc/guacamole/user-mapping.xml


<user-mapping>
    <authorize username="admin" password="admin123">
        <connection name="ssh">
            <protocol>ssh</protocol>
            <param name="hostname">localhost</param>
            <param name="port">22</param>
            <param name="username"></param>
        </connection>
        <connection name="vnc">
            <protocol>rdp</protocol>
            <param name="hostname">localhost</param>
            <param name="port">5900</param>
        </connection>
        <connection name="vnc2">
            <protocol>rdp</protocol>
            <param name="hostname">localhost</param>
            <param name="port">5901</param>
        </connection>
    </authorize>
</user-mapping>


sudo apt-get install x11vnc net-tools
sudo x11vnc -forever -loop -noxdamage -repeat -shared

sudo service tomcat8 restart

